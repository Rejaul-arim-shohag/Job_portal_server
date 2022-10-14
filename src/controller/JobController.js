const JobModel = require("../model/JobModel");

exports.CreateJob = (req, res) => {
    JobModel.create(req.body, (err, data) => {
        if (err) {
            res.status(200).json({ "status": "fail", "data": err })
        } else {
            res.status(200).json({ "status": "success", "data": data })
        }
    })
}

exports.readJobs = async(req, res) => {
    try{
        let pageNo = Number(req.params.pageNo);
        let perPage = Number(req.params.parPage); 
        let skipRow = (pageNo - 1) * perPage;
        let data;
        JobModel.aggregate([
            {$lookup:{from:"jobs", localField:"categorieId", foreignField:"categorieId", as:"categories"}},
        ], (err, data) => {
            if (err) {
                res.status(200).json({ "status": "fail", "data": err })
            } else {
                res.status(200).json({ "status": "success", "data": data })
            }
        })
    } 
    catch(err){

    }
}




