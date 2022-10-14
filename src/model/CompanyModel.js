const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    company_name: { type: String},
    company_address: { type: String },
    company_contact: { type: String },
    company_email: { type: String, unique: true },
    company_website: { type: String},
    username: { type: String, unique: true },
    professional_summary: { type: String },
    profile_image: { type: String },
    founded_date: { type:String },
    company_size: { type: String },
    categories: { type: String },
    password: { type: String },
    account_status: { type: String, default: "1" },
    linkedin: { type: String },
    createDate: { type: Date, default: Date.now() },
}, { versionKey: false });

const CompanyModel = mongoose.model("companies", Schema);
module.exports = CompanyModel;