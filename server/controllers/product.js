const Product=require('../models/product.model')

module.exports.createProduct = (req,res,next)=>{
  const product = req.body
  try{
    const newProduct = new Product(product)
    newProduct.save()
    res.status(201).send({message:"Product Has been created successfully", product})
  }catch(err){
    next(err);
  }
  
}
module.exports.getProducts =async (req, res, next)=>{
    try{
    const product = await Product.find()
    res.status(200).send(product)
  }catch (error) {
    next(error);
   }
}

module.exports.getProductByCategory =async(req, res, next)=>{
  const  {category } = req.params;
  try{
    const product = await Product.find({category})
    res.status(200).send(product)
  }catch (error) {
    next(error);
   }
}

module.exports.getSingleProduct = async(req, res, next)=>{
  const {id} = req.params
  try {
    const product= await Product.findById(id)
    res.status(200).send(product)

  }catch(err) {
    next(err)
  }
}
module.exports.quantity =async(req,res, next)=>{
  const {count} = req.body
  const {id}=req.query
  try{
    const inc=await Product.findByIdAndUpdate(id,{$inc:{quantity:count}})
    res.send(inc)
  }catch(err) {
    next(err)
  }
 
  
}