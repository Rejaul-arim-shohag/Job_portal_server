const ApplicationDetailModel = require ("../model/ApplicationDetail");

exports.CreateJobApply =(req, res)=>{
    ApplicationDetailModel.create(req.body, (err,data)=>{
        if(err){
            res.status(200).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}