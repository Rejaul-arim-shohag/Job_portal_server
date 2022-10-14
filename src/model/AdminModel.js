const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    admin_name: { type: String,},
    admin_contact:{ type: String },
    admin_email:{ type: String, unique: true},
    username: { type: String, unique: true },
    password: { type: String },
    admin_photo: { type: String},
    createDate: { type: Date, default: Date.now()},
}, { versionKey: false });

const AdminModel = mongoose.model("admins", Schema);
module.exports = AdminModel;