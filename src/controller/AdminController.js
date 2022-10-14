const AdminModel = require ("../model/AdminModel");
var jwt = require('jsonwebtoken');


exports.AdminRegistration =(req, res)=>{
    AdminModel.create(req.body, (err,data)=>{
        if(err){
            res.status(200).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}

exports.AdminLogin=(req, res)=>{
    const reqBody = req.body;
    AdminModel.aggregate([
        {$match:reqBody},
        {$project:{
            _id:1,
            admin_name:1,
            admin_contact:1,
            admin_email:1,
            username:1,
            admin_photo:1,
            createDate:1
        }}
    ], (err, data)=>{
        if(err){
            res.status(400).json({"status":"fail", "data":err})
        } else{
            if(data.length>0){
                let Payload={exp: Math.floor(Date.now() / 1000) + (24*60*60), data:data[0]["admin_email"]};
                let token = jwt.sign( Payload,'SecretKey123456789');
                res.status(200).json({"status":"success", "AdminToken":token, "data":data[0]})
            } else{
                res.status(201).json({"status":"No Admin Found"})
            }
        }
    })
}


exports.AdminProfileUpdate=(req, res)=>{
    const email = req.headers['admin_email'];
    const reqBody =req.body;
    AdminModel.updateOne({admin_email:email}, reqBody, (err,data)=>{
        if(err){
            res.status(400).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}