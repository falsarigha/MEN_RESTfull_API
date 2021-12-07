const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


let userSchema = new Schema(
{
    name: 
    {
        type: String,
        required: "Name is required",
        min: 6,
        max: 255
    },
    email: 
    {
        type: String,
        required: "Email si required",
        min: 6,
        max: 255,
    },
    password: 
    {
        type: String,
        required: "password is required",
        min: 6,
        max: 255
    },
    date:
    {
        type: Date,
        default: Date.now
    }

}
)

module.exports = mongoose.model("user", userSchema);