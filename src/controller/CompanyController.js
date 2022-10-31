const CompanyModel = require ("../model/CompanyModel");
var jwt = require('jsonwebtoken');

const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

exports.registrationCompany =(req, res)=>{
    CompanyModel.create(req.body, (err,data)=>{
        if(err){
            res.status(200).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}

exports.EmployerLogin = (req, res) => {
    const reqBody = req.body;
    CompanyModel.aggregate([
        { $match: reqBody },
        {
            $project: {
                company_name: 1,
                company_address: 1,
                company_contact:1,
                company_email: 1,
                company_website:1,
                username: 1,
                professional_summary: 1,
                profile_image: 1,
                founded_date: 1,
                company_size: 1,
                categories: 1,
                password: 1,
                account_status: 1,
                linkedin: 1,
                createDate:1,
            }
        }
    ], (err, data) => {
        if (err) {
            res.status(400).json({ "status": "fail", "data": err })
        } else {
            if (data.length > 0) {
                let Payload = { exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: data[0]["company_email"] };
                let EmployerToken = jwt.sign(Payload, 'SecretEmployerKey123456789');
                res.status(200).json({ "status": "success", "EmployerToken": EmployerToken, "data": data[0] })
            } else {
                res.status(201).json({ "status": "No Employee Found" })
            }
        }
    })
}

exports.CompanyProfileUpdate =(req, res)=>{
    const company_id = req.params.company_id
    CompanyModel.updateOne({_id: company_id}, req.body, (err, data)=>{
        if(err){
            res.status(200).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}

exports.readCompanyProfile = async (req, res) => {
    const id = req.params.id
    CompanyModel.aggregate([
        { $match: { _id: objectId(id) } },
        {
            $project: {
                company_name: 1,
                company_address: 1,
                company_contact: 1,
                company_email: 1,
                company_website: 1,
                professional_summary: 1,
                profile_image: 1,
                founded_date: 1,
                company_size: 1,
                categories: 1,
                linkedin: 1,
            }
        }
    ], (err, data) => {
        if (err) {
            res.status(400).json({ "status": "fail", "data": err })
        } else {
            res.status(200).json({ "status": "success", "data": data })
        }
    })

}