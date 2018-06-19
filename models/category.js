var mongoose  = require("mongoose");

var categorySchema = new mongoose.Schema({
    name: String,
    image: String,
    tools:[
        {
           type:mongoose.Schema.Types.ObjectId,
           ref: "Tool"
        }
    ]
});

module.exports = mongoose.model("Category", categorySchema);

