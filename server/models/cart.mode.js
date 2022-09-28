const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserDetails", required: true },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});
