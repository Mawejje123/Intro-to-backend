import { User } from "../models/user.model.js";

// Register
const registerUser = async (req, res, next) => { // <-- add 'next'
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const newUser = await User.create({
            username,
            email: email.toLowerCase(),
            password,
        });

        res.status(201).json({ 
            message: "User registered successfully",
            newUser: { _id: newUser._id, email: newUser.email, username: newUser.username }
        });
    } catch (error) {
        next(error); // <-- forward error to centralized handler
    }
};

// Login
const loginUser = async (req, res, next) => { // <-- add 'next'
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(404).json({ message: "User not found!" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

        res.status(200).json({
            message: "User logged in successfully",
            user: { _id: user._id, email: user.email, username: user.username }
        });
    } catch (error) {
        next(error); // <-- forward error to centralized handler
    }
};

const logoutUser = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            email
        });

        if(!user) return res.status(404).json({
            message: "User not found!"
        });

        res.status(200).json({
            message: "Logout successful"
        }); 
        } catch (error) {
        res.status(500).json({
            message: "Intenal Server Error", error
        });
    }
}

export { registerUser, loginUser, logoutUser };
