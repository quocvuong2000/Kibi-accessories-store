const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId : {type : String, unique : true},
        userName : {type : String, required : true},
        email : { type : String},
        products : [
            {
                productId : {type : String },
                quantity : {type : Number}
            }
        ],
        totalProduct : {type : Number},
        amount : {type : Number},
        address : {type : String, required : true}
    }
);

module.exports = mongoose.model("Order", OrderSchema);