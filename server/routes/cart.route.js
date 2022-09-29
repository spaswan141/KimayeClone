const {viewCart,addToCart,deleteProduct,updateCart}=require('../controllers/cart')
const {Router}=require('express')
const cartRouter = Router()

cartRouter.get('/cart/userId',viewCart)
cartRouter.post('/cart/userId',addToCart)
cartRouter.delete('/delete/cart/:id',deleteProduct)
cartRouter.put('/update/cart/:id',updateCart)

module.exports =cartRouter