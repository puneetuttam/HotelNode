const mongoose = require("mongoose");

const MenuSchmea = mongoose.Schema({    
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    taste: {
        type: String,
        enum: ["sweet", "spicy", "sour"],
        required:true
    },
    isDrink: {
        type: Boolean,
        default: false,
    },
    incredient: {
        type: [String],
        default: [],
    },
    num_sales: {
        type: Number,
        default: 0,
    },
});


const MenuItem=new mongoose.model('MenuItem',MenuSchmea)
module.exports=MenuItem;
