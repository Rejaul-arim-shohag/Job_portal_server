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
        { $sort: { _id: 1 } }
    ], (err, data)=>{
        if(err){
            res.status(200).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}
