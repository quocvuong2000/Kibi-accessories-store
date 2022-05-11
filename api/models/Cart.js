const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        products : [
            {
                productId : {type : String},
                quantity : {type : Number}
            }
        ]
    }
)

module.exports = CartSchema;