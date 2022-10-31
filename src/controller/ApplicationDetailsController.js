const ApplicationDetailModel = require("../model/ApplicationDetail");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

exports.CreateJobApply = (req, res) => {
    ApplicationDetailModel.create(req.body, (err, data) => {
        if (err) {
            res.status(200).json({ "status": "fail", "data": err })
        } else {
            res.status(200).json({ "status": "success", "data": data })
        }
    })
}


exports.readApplicantJobs = (req, res) => {
    const applicant_id = req.params.applicant_id;
    ApplicationDetailModel.aggregate([
        {$match: { applicant_id: objectId(applicant_id) } },
        {$lookup: {from: "companies", localField: "companyId", foreignField: "_id", as: "company"}},
        {$lookup: {from: "jobs", localField: "job_id", foreignField: "_id", as: "job"}},
        {$lookup: {from: "applicants", localField: "applicant_id", foreignField: "_id", as: "applicants"}},
        {
            $project:{
                _id:1,
                applicant_id:1,
                job_id:1,
                companyId:1,
                application_status:1,
                createDate:1,
                company_name: { $first: "$company.company_name"},
                company_address: { $first: "$company.company_address"},
                company_contact: { $first: "$company.company_contact"},
                company_email: { $first: "$company.company_email"},
                company_website: { $first: "$company.company_website"},
                profile_image: { $first: "$company.profile_image"},
                founded_date: { $first: "$company.founded_date"},
                company_size: { $first: "$company.company_size"},
                categories: { $first: "$company.categories"},
                linkedin: { $first: "$company.linkedin"},
                job_title: { $first: "$job.job_title"},
                job_description: { $first: "$job.job_description"},
                job_salary: { $first: "$job.job_salary"},
               
            }
        }
    ], (err, data) => {
        if (err) {
            res.status(500).json({ "status": "fail", "data": err })
        } else {
            res.status(200).json({ "status": "success", "data": data })

        }
    })
}


exports.readEmployerJobDetails = (req, res) => {
    const company_Id = req.params.company_Id;
    ApplicationDetailModel.aggregate([
        {$match: { companyId: objectId(company_Id) } },
        {$lookup: {from: "companies", localField: "companyId", foreignField: "_id", as: "company"}},
        {$lookup: {from: "jobs", localField: "job_id", foreignField: "_id", as: "job"}},
        {$lookup: {from: "applicants", localField: "applicant_id", foreignField: "_id", as: "applicants"}},
        
    ], (err, data) => {
        if (err) {
            res.status(500).json({ "status": "fail", "data": err })
        } else {
            res.status(200).json({ "status": "fail", "data": data })

        }
    })
}


