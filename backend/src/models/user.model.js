import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, // Remove whitespace
            minLength: 3,
            maxLength: 30,
        },

        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 50,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, // Remove whitespace
        },

    },
    {
        timestamps: true,
        
    }
);

//Before saving the user, hash the password
userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

//Compare entered password with hashed password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema)