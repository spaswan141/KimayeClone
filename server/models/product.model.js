const {Schema,model}=require('mongoose')

const productSchema= new Schema({
    title:{type:String, required:true},
    price:{type:Number, required:true},
    imgUrl:{type:String, required:true},
    description:{type:String, required:true},
    category:String,
})
const Product= model("product",productSchema)
module.exports = Product