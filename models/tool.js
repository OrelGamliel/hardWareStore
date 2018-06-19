var mongoose  = require("mongoose");

var toolSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String,
    category: String,
    comments:[
        {
           type:mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Tool", toolSchema);

