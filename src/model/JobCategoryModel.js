const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    category_name: { type: String, require:true},
    admin_id:{ type: mongoose.Schema.ObjectId }, 
    createDate: { type: Date, default: Date.now()},
}, { versionKey: false });

const CategoryModel = mongoose.model("categories", Schema);
module.exports = CategoryModel;