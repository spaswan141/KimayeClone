const {Schema,model}=require('mongoose')

const productSchema= new Schema({
    title:{type:String, required:true},
    price:{type:Number, required:true},
    imgUrl:{type:String, required:true},
    description:{type:String, required:true},
    category:{type:String, required:true,enum:["fruits","fresh cuts","fruit combos","vegies"]},
    quantity:{type:Number, required:true,default:1}
})
const Product= model("product",productSchema)
module.exports = Product