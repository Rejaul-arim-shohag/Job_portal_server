const JobCategoryModel = require("../model/JobCategoryModel");

exports.jobCategoryCreate =(req, res)=>{
    JobCategoryModel.create(req.body, (err,data)=>{
        if(err){
            res.status(200).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}

exports.jobCategoryRead =(req, res)=>{
    JobCategoryModel.aggregate([
        {$sort: { _id: 1 } },
        {$lookup:{from:"jobs", localField:"_id", foreignField:"job_category_id", as:"jobs"}},
    ], (err, data)=>{
        if(err){
            res.status(200).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}

exports.updateJobCategory =(req, res)=>{
    const job_category_id = req.params.job_category_id
    JobCategoryModel.updateOne({_id:job_category_id},req.body, (err,data)=>{
        if(err){
            res.status(200).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}
