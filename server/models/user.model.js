const {Schema, model}=require('mongoose')
const jwt=require('jsonwebtoken')
const Joi=require('joi')
const passwordComplexity = require("joi-password-complexity")

const UserSchema= new Schema({
    firstName: {required: true,type:String},
    lastName: {required: true,type:String},
    email: {required: true,type:String},
    password: {required: true,type:String},
})

UserSchema.methods.generateAuthToken = function(){
    const token=jwt.sign({
        _id:this._id,
        name:this.firstName,
    },
    process.env.PRIVATEKEY,
    );
    return token;
    
}
const validate=(user)=>{
  const schema=Joi.object({
    firstName: Joi.string().min(5).max(20).required(),
    lastName: Joi.string().min(5).max(20).required(),
    email: Joi.string().email().required(),
    password:passwordComplexity().required(),
  })
  return schema.validate(user)
}
const User = model("UsersDetails", UserSchema);

module.exports = { User,validate};