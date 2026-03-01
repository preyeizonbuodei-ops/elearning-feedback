const express = require('express')
const user = require('../module/userSchema')
const { userSignUP, userComment } = require('../middleware/validate')
const { DoHash } = require('../utils/hash')
const comment = require('../module/commentSchema')
const commentSchema = require('../module/commentSchema')
express.Router()
const mongoose = require('mongoose')


// signup controller or module
exports.signup = async (req, res) => {
    const {username, email, password } = req.body;

    try {
        const { error } = userSignUP.validate({username, email, password });
        if (error) {
            return res.status(401).json({ success: false, message: error.details[0].message });
        }

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists with this email" });
        }

        const hashedPassword = await DoHash(password, 12);
        const newUser = new user({username, email, password: hashedPassword });
        const result = await newUser.save();

        result.password = undefined;
        res.status(201).json({ success: true, message: "Account created successfully", data: result });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// comment controller
exports.comment = async (req, res) => {
    const { comment } = req.body;

    try {
        const { error } = userComment.validate({ comment });
        if (error) {
            return res.status(400).json({ success: false, message: "Comment must not be empty" });
        }

        const newComment = new commentSchema({ comment });
        const CommentResult = await newComment.save();

        res.status(200).json({
            success: true,
            message: "Your comment has been saved successfully",
            data: CommentResult
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
