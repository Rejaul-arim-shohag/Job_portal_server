const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    applicant_name: { type: String},
    job_title: { type: String },
    gender: { type: String },
    phone: { type: String },
    applicant_cv:{ type: String },
    email_address: { type: String, unique: true},
    professional_summary: { type: String},
    profile_image: { type: String },
    username: { type: String, unique: true},
    age: { type: Number },
    salary: { type: String },
    experience: { type: String },
    password: { type: String },
    account_status: { type: String, default:"1" },
    linkedin: { type: String },
    createDate: { type: Date, default: Date.now() },
}, { versionKey: false });

const ApplicantModel = mongoose.model("applicants", Schema);
module.exports = ApplicantModel;