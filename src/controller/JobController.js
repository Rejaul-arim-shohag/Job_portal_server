const JobModel = require("../model/JobModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
exports.CreateJob = (req, res) => {
    JobModel.create(req.body, (err, data) => {
        if (err) {
            res.status(200).json({ "status": "fail", "data": err })
        } else {
            res.status(200).json({ "status": "success", "data": data })
        }
    })
}


exports.readJobs = async (req, res) => {
    try {
        let pageNo = Number(req.params.pageNo);
        let perPage = Number(req.params.parPage);
        let skipRow = (pageNo - 1) * perPage;
        //filter
        const searchKeyword = req.body.searchKeyword;
        const job_location_id = req.body.job_location_id;
        const job_category_id = req.body.job_category_id;
        const job_type = req.body.job_type;
        const sortBy = req.body.sortBy;
        let data;
        var Value_match = new RegExp(searchKeyword);
        data = await JobModel.aggregate([
            {
                $facet:
                {
                    total: [
                        {
                            $match: {
                                $and: [
                                    searchKeyword ? { job_title: { $regex: Value_match, $options: "$i" } } : {},
                                    job_category_id ? { job_category_id: ObjectId(job_category_id) } : {},
                                    job_location_id ? { job_location_id: ObjectId(job_location_id) } : {},
                                    job_type ? { job_type: ObjectId(job_type) } : {},

                                ]
                            }
                        }, { $count: "count" }
                    ],
                    Rows: [
                        {
                            $match: {
                                $and: [
                                    searchKeyword ? { job_title: { $regex: Value_match, $options: "$i" } } : {},
                                    job_category_id ? { job_category_id: ObjectId(job_category_id) } : {},
                                    job_location_id ? { job_location_id: ObjectId(job_location_id) } : {},
                                    job_type ? { job_type: ObjectId(job_type) } : {},
                                ]
                            }
                        },
                        { $skip: skipRow },
                        { $limit: perPage },
                        {
                            $lookup: {
                                from: "categories", localField: "job_category_id", foreignField: "_id", as: "category"
                            }
                        },
                        {
                            $lookup: {
                                from: "companies", localField: "company_id", foreignField: "_id", as: "company"
                            }
                        },
                        {
                            $lookup: {
                                from: "types", localField: "job_type", foreignField: "_id", as: "type"
                            }
                        },
                        {
                            $lookup: {
                                from: "locations", localField: "job_location_id", foreignField: "_id", as: "location"
                            }
                        },
                        {
                            $project: {
                                _id: 1, job_title: 1, job_description: 1, job_category_id: 1, company_id: 1, job_type: 1, isArgent: 1,
                                job_location_id: 1, job_salary: 1, last_application_date: 1, no_of_vacancy: 1, job_status: 1, createDate: 1,
                                category_name: { $first: "$category.category_name" },
                                company_name: { $first: "$company.company_name" },
                                company_address: { $first: "$company.company_address" },
                                company_contact: { $first: "$company.company_contact" },
                                company_email: { $first: "$company.company_email" },
                                company_website: { $first: "$company.company_website" },
                                professional_summary: { $first: "$company.professional_summary" },
                                profile_image: { $first: "$company.profile_image" },
                                founded_date: { $first: "$company.founded_date" },
                                company_size: { $first: "$company.company_size" },
                                categories: { $first: "$company.categories" },
                                linkedin: { $first: "$company.linkedin" },
                                type: { $first: "$type.type_name" },
                                location: { $first: "$location.location_name" },

                            }
                        },
                        {$sort:{ createDate : -1 } }

                    ]
                }
            }
        ])

        res.status(200).json({ status: "success", data: data })
    }
    catch (err) {
        res.status(200).json({ status: "success", error: "No data found" })
    }
}



exports.readJobById = async (req, res) => {
    const jobId = req.params.job_id;
    JobModel.aggregate([
        { $match: { _id: ObjectId(jobId) } },
        {
            $lookup: {
                from: "categories", localField: "job_category_id", foreignField: "_id", as: "category"
            }
        },
        {
            $lookup: {
                from: "companies", localField: "company_id", foreignField: "_id", as: "company"
            }
        },
        {
            $lookup: {
                from: "types", localField: "job_type", foreignField: "_id", as: "type"
            }
        },
        {
            $lookup: {
                from: "locations", localField: "job_location_id", foreignField: "_id", as: "location"
            }
        },
        {
            $project: {
                _id: 1,
                job_title: 1,
                job_description: 1,
                job_category_id: 1,
                company_id: 1,
                job_type: 1,
                job_location_id: 1,
                job_salary: 1,
                last_application_date: 1,
                no_of_vacancy: 1,
                job_status: 1,
                createDate: 1,
                category_name: { $first: "$category.category_name" },
                company_name: { $first: "$company.company_name" },
                company_address: { $first: "$company.company_address" },
                company_contact: { $first: "$company.company_contact" },
                company_email: { $first: "$company.company_email" },
                company_website: { $first: "$company.company_website" },
                professional_summary: { $first: "$company.professional_summary" },
                profile_image: { $first: "$company.profile_image" },
                founded_date: { $first: "$company.founded_date" },
                company_size: { $first: "$company.company_size" },
                categories: { $first: "$company.categories" },
                linkedin: { $first: "$company.linkedin" },
                job_type_name: { $first: "$type.type_name" },
                location: { $first: "$location.location_name" },
            }
        }
    ], (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        } else {
            res.status(200).json({ status: "success", data: data })
        }
    })

}

exports.readJobsByCompanyId = (req, res) => {
    const company_id = req.params.company_id;
    JobModel.aggregate([
        { $match: { company_id: ObjectId(company_id) } },
        {
            $lookup: {
                from: "categories", localField: "job_category_id", foreignField: "_id", as: "category"
            }
        },
        {
            $lookup: {
                from: "companies", localField: "company_id", foreignField: "_id", as: "company"
            }
        },
        {
            $lookup: {
                from: "types", localField: "job_type", foreignField: "_id", as: "type"
            }
        },
        {
            $lookup: {
                from: "locations", localField: "job_location_id", foreignField: "_id", as: "location"
            }
        },
        {
            $project: {
                _id: 1,
                job_title: 1,
                job_description: 1,
                job_category_id: 1,
                company_id: 1,
                job_type: 1,
                job_location_id: 1,
                job_salary: 1,
                last_application_date: 1,
                no_of_vacancy: 1,
                job_status: 1,
                createDate: 1,
                category_name: { $first: "$category.category_name" },
                company_name: { $first: "$company.company_name" },
                company_address: { $first: "$company.company_address" },
                company_contact: { $first: "$company.company_contact" },
                company_email: { $first: "$company.company_email" },
                company_website: { $first: "$company.company_website" },
                professional_summary: { $first: "$company.professional_summary" },
                profile_image: { $first: "$company.profile_image" },
                founded_date: { $first: "$company.founded_date" },
                company_size: { $first: "$company.company_size" },
                categories: { $first: "$company.categories" },
                linkedin: { $first: "$company.linkedin" },
                job_type_name: { $first: "$type.type_name" },
                location: { $first: "$location.location_name" },
            }
        },
        { $sort: { _id: -1 } },
    ], (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", data: err })
        } else {
            res.status(200).json({ status: "success", data: data })
        }
    })

}


