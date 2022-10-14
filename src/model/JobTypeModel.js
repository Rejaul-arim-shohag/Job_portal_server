const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    type_name: { type: String, require:true},
    admin_id:{ type: mongoose.Schema.ObjectId}, 
    createDate: { type: Date, default: Date.now()},
}, { versionKey: false });

const typeModel = mongoose.model("types", Schema);
module.exports = typeModel;