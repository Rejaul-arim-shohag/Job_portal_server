const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    job_title: { type: String,},
    job_description:{ type: String },
    job_category_id:{ type: mongoose.Schema.ObjectId},
    company_id: { type: mongoose.Schema.ObjectId },
    job_type: { type: mongoose.Schema.ObjectId},
    job_location_id:{ type: mongoose.Schema.ObjectId},
    job_salary: { type: String },
    last_application_date: { type: String },
    no_of_vacancy: { type: String },
    isArgent: { type: Boolean, default:"false" },
    job_status: { type: String, default:"1" },
    createDate: { type: Date, default: Date.now()},
}, { versionKey: false });

const JobModel = mongoose.model("jobs", Schema);
module.exports = JobModel;