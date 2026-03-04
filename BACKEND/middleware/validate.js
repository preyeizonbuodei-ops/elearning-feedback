const joi = require('joi');


exports.userSignUP = joi.object({
  username: joi.string()
  .min(2)
  .max(30)
  .required(),

  email: joi.string()
    .min(3)
    .max(40)
    .required()
    .email({ tlds: { allow: ['com', 'net'] } }),

  password: joi.string()
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")) .required() 
    
    .messages({ "string.pattern.base": "Password must be at least 8 characters long and include at least one letter and one number" })
});


exports.userComment = joi.object({
  username: joi.string()
  .trim()
  .required(),

  comment: joi.string()
  .min(3)
  .max(1000)
  .required()
})