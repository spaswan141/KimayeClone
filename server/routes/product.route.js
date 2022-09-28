const {Router}=require('express')
const {createProduct,getProducts,getSingleProduct,quantity,getProductByCategory}=require('../controllers/product')


const ProductRouter=Router()

ProductRouter.post('/createproduct', createProduct);
ProductRouter.get('/getproduct/:category',getProductByCategory);
ProductRouter.get('/getproducts',getProducts);
ProductRouter.get('/getproducts/:id',getSingleProduct);
ProductRouter.put('/changequantity',quantity)


module.exports = ProductRouter