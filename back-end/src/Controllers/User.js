import bcrypt from "bcryptjs";
import User from "../Model/Register.js";
import { finduserbyemail, findUserById } from "../Repository/user.js";
import generatetoken from "../utils/TokenGenerete.js";

export const Register = async (req, res) => {
    try {
        const { Email, Password, UserName } = req.body;

        console.log('Received:', { Email, Password, UserName });

        // Check if user already exists
        const existingUser = await finduserbyemail(Email);
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists with this Email',
                success: false
            });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Create new user
        const newUser = await User.create({
            Email,
            Password: hashedPassword,
            UserName
        });
        await newUser.save();

        return res.status(201).json({
            message: 'User registered successfully',
            success: true,
            user: {
                Email: newUser.Email,
                UserName: newUser.UserName
            }
        });
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

export const Login = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        // Find user by email
        const user = await finduserbyemail(Email);
        console.log('User Found:', user);

        if (!user) {
            return res.status(401).json({
                message: 'User not found',
                success: false
            });
        }

        // Compare passwords
        const isValidPassword = await bcrypt.compare(Password, user.Password);
        console.log('Password Match:', isValidPassword);

        if (!isValidPassword) {
            return res.status(401).json({
                message: 'Invalid Password',
                success: false
            });
        }

        // Generate JWT token
        const token = await generatetoken(user._id);
        console.log('Generated Token:', token);

        return res.status(200).json({
            message: 'Logged in successfully',
            token,
            success: true
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const DeleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        // Find user by ID
        const user = await findUserById(id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        // Delete user
        await User.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'User deleted successfully',
            success: true
        });
    } catch (error) {
        console.error("Delete Error:", error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};
