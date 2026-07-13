import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const generatedToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET || 'fallback_secret',{expiresIn : '30d'});
}

// Register user
//Post /api/auth/register

export const registerUser = async (req , res) => {
    try {
        const {email , password , name} = req.body;
        // Validate required fields
        if (![name, email, password].every((field) => field && field.trim())) {
            return res.status(400).json({ message : "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({ message : "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password , salt);

        const user = await User.create({name , email , password : hashPassword});

        if(user){
            res.status(201).json({_id : user._id, name : user.name, email : user.email, token : generatedToken(user._id.toString()) });
        }else {
            res.status(400).json({ message : "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message : error?.message || "Server Error" });
    }
}

// Login user
//Post /api/auth/login

export const loginUser = async (req , res) => {
    try {
        const {email , password} = req.body;
         if (![email, password].every((field) => field && field.trim())) {
            res.status(400).json({ message : "All fields are required" });
            return;
        }

        const user = await User.findOne({email});

        if(user && (await bcrypt.compare(password,user.password))){
            res.status(201).json({message : 'User login successfully', token : generatedToken(user._id.toString()), user });
        }else {
            res.status(400).json({ message : "Invalid email or password" });
        }

    } catch (error) {
        res.status(500).json({ message : error?.message || "Server Error" });
    }
}



// Get Logged-in User
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;

    delete updates.password;
    delete updates.role;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout
export const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};
