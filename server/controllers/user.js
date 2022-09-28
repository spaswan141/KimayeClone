const {User,validate} = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.newuser = async function (req, res, next) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.send({ message: "User Already Exits" });
  }
  const salt = await bcrypt.genSalt(Number(10));
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = await new User({
    ...req.body,
    password: hashPassword,
  });
  newUser.save((err, succ) => {
    if (err) {
      return res
        .status(200)
        .send({ message: "Error occurred due wrong validation" });
    } else {
      return res.status(200).send(succ);
    }
  });
};

module.exports.loginUser=async(req,res)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return res.send({message:"Invalid email or password"})
    }
    const validPassword= await bcrypt.compare(req.body.password,user.password)
    const token=user.generateAuthToken()
    if(!validPassword){
        return res.send({message:"Invalid password"})
    }else{
        
        return res.send({message:"Login successful",token:token,name:user.name})
    }

}
module.exports.users=async function(req, res){
    const user=await User.find()
    res.send(user)
}