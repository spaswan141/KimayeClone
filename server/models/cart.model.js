const { Schema,model } = require("mongoose");

const cartSchema = new Schema({
  user: { type:Schema.Types.ObjectId, ref: "UserDetails", required: true },
  cartItems: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});
const Cart= model("cartItems",cartSchema);
module.exports = Cart;


