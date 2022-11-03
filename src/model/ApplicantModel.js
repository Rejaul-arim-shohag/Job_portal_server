const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    applicant_name: { type: String, default:"" },
    job_title: { type: String, default:"" },
    gender: { type: String, default:"" },
    phone: { type: String, default:"" },
    dateOfBirth:{ type: String, default:"" },
    applicant_cv:{ type: String, default:"" },
    email_address: { type: String, unique: true},
    professional_summary: { type: String, default:""},
    profile_image: { type: String, default:"https://res.cloudinary.com/dub6q8hhb/image/upload/v1666500792/icon/profile_pg9ghd.png" },
    age: { type: String, default:"" },
    salary: { type: String, default:"" },
    experience: { type: String, default:"" },
    password: { type: String },
    account_status: { type: String, default:"1" },
    linkedin: { type: String, default:"" },
    createDate: { type: Date, default: Date.now()},
}, { versionKey: false });

const ApplicantModel = mongoose.model("applicants", Schema);
module.exports = ApplicantModel;