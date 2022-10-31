const LocationModel = require ("../model/LocationModel");
exports.CreationLocation =(req, res)=>{
    LocationModel.create(req.body, (err,data)=>{
        if(err){
            res.status(200).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}

exports.readLocations =(req, res)=>{
    LocationModel.find({}, (err,data)=>{
        if(err){
            res.status(200).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}



