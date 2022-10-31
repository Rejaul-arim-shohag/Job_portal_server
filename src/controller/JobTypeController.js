const JobTypeModel = require("../model/JobTypeModel");

exports.jobTypeCreate =(req, res)=>{
    JobTypeModel.create(req.body, (err,data)=>{
        if(err){
            res.status(200).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}

exports.jobTypeRead =(req, res)=>{
    JobTypeModel.aggregate([
        { $sort: { _id: 1 } },
    ], (err, data)=>{
        if(err){
            res.status(200).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}
