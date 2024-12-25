const mongoose=require('mongoose')
const PersonSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
    },
    work: {
        type:String,
        enum: ["chef", "waiter", "manager"],
        required: true,
    },
});

const Person = new mongoose.model("Person", PersonSchema);
module.exports=Person;
