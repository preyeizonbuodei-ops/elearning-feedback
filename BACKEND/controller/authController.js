const express = require('express')
const user = require('../module/userSchema')
const { userSignUP } = require('../middleware/validate')
const { DoHash } = require('../utils/hash')
express.Router()


exports.signup = async (req, res) => {
    const { email, password, } = req.body;
    

     try {
        const { error } = userSignUP.validate({  email, password });

        if(error){
             return res.status(401).json({ success: false, message: error.details[0].message  })
        }

         const existingUser = await user.findOne({ email })
        if(existingUser) {
             res.status(400).json({ success: false, message: "User already exist with this email" })
        }

         const harshedPassword = await DoHash( password, 12)

         const newUser  = ({ email, password,  harshedPassword})
         const result = await newUser.save()

         result.password = undefined;
         res.status(201).json({ success: true, message: 'account created successfully' })
         

    } catch (error) {
        console.log('error')
    }
}
