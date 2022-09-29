const Cart=require('../models/cart.model')

function runUpdate(condition, updateData) {
    return new Promise((resolve, reject) => {
      //you update code here
  
      Cart.findOneAndUpdate(condition, updateData, { upsert: true })
        .then((result) => resolve())
        .catch((err) => reject(err));
    });
  }

module.exports.viewCart=async(req,res,next) => {
    Cart.findOne({ user: req.user._id })
    .populate("cartItems.product", "_id name price productPictures")
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart) {
        let cartItems = {};
        cart.cartItems.forEach((item, index) => {
          cartItems[item.product._id.toString()] = {
            _id: item.product._id.toString(),
            name: item.product.name,
            img: item.product.productPictures[0].img,
            price: item.product.price,
            qty: item.quantity,
          };
        });
        res.status(200).json({ cartItems });
      }
    });
}

module.exports.addToCart=(req, res, next) => {
    Cart.findOne({ user: req.user._id }).exec((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
        let promiseArray = [];
    
          req.body.cartItems.forEach((cartItem) => {
            const product = cartItem.product;
            const item = cart.cartItems.find((c) => c.product == product);
            let condition, update;
            if (item) {
              condition = { user: req.user._id, "cartItems.product": product };
              update = {
                $set: {
                  "cartItems.$": cartItem,
                },
              };
            } else {
              condition = { user: req.user._id };
              update = {
                $push: {
                  cartItems: cartItem,
                },
              };
            }
           promiseArray.push(runUpdate(condition, update))});
          Promise.all(promiseArray)
            .then((response) => res.status(201).json({ response }))
            .catch((error) => res.status(400).json({ error }));
        } else {
          //if cart not exist then create a new cart
          const cart = new Cart({
            user: req.user._id,
            cartItems: req.body.cartItems,
          });
          cart.save((error, cart) => {
            if (error) return res.status(400).json({ error });
            if (cart) {
              return res.status(201).json({ cart });
            }
          });
        }
      });
}

module.exports.deleteProduct =async(req,res,next) => {
    try {
        const { id } = req.params;
        await Cart.findByIdAndDelete(id)
        res.send({ message: "Item deleted" }) 
    }
    catch (error) {
        next(error);
    }
}

module.exports.updateCart=async()=>{
    try {
        const { count } = req.body;
        const { id } = req.query;
        await Cart.findByIdAndUpdate(id, { $inc: { qty: count } });
        const product = await Cart.findById(id);
        const price = product.qty * product.price;
        await Cart.findByIdAndUpdate(id, { price });
        res.status(200);
    }
    catch (error) {
        next(error);
    }
}