import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTockenAndSetCookie from "../utils/generateToken.js";
export const signup = async(req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        // HASH the Password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        if (newUser) {
            generateTockenAndSetCookie(newUser._id, res);
            res.status(201).json(newUser);
        } else {
            res.status(400).json({ error: "Something went wrong" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        const isMatch = await bcrypt.compare(password, user.password || "");
        if (!user || !isMatch) {
            return res.status(400).json({ error: "Invalid username and password" });
        }
        generateTockenAndSetCookie(user._id, res);
        res.status(200).json({
            message: "Logged in successfully",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const logout = async(req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};