const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    applicant_id:{ type: mongoose.Schema.ObjectId },
    job_id:{ type: mongoose.Schema.ObjectId },
    application_status: { type: String, default:"1"},
    createDate: { type: Date, default: Date.now() },
}, { versionKey: false });

const ApplicationDetailModel = mongoose.model("applications", Schema);
module.exports = ApplicationDetailModel;