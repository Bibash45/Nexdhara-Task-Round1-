import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // Ensure password hashing
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user) => {
    return jwt.sign({
            _id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET, {
            expiresIn: "7d"
        }
    );
};

const setTokenCookie = (res, token) => {
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
};

// Login User
export const loginUser = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        const user = await User.findOne({
            username
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Please register first."
            });
        }

        if (await user.matchPassword(password)) {
            const token = generateToken(user);
            setTokenCookie(res, token);

            return res.status(200).json({
                success: true,
                message: "Login successful",
                access_token: token,
                data: {
                    _id: user._id,
                    email: user.email,
                    username: user.username,
                    role: user.role
                },
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

// Register User
export const postUser = async (req, res) => {
    const {
        email,
        username,
        password
    } = req.body;

    try {
        let user = await User.findOne({
            email
        });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        user = await User.create({
            email,
            username,
            password
        });

        const token = generateToken(user);
        setTokenCookie(res, token);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            access_token: token,
            data: {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

// Get All Users
export const getUser = async (req, res) => {
    try {
        const users = await User.find();

        if (!users.length) {
            return res.status(404).json({
                success: false,
                message: "No users found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Users found",
            data: users
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

// Get User by ID
export const getUserDetail = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User found",
            data: user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted",
            data: user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

// Update User
export const updateUser = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        username,
        email,
        password,
        role
    } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.username = username || user.username;
        user.email = email || user.email;
        user.role = role || user.role;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const logoutUser = async (req, res) => {
    res.clearCookie("jwt")
    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
}