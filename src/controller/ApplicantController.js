const ApplicantModel = require("../model/ApplicantModel");
var jwt = require('jsonwebtoken');
const Cloudinary = require("../Utilites/Cloudinary");

const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

exports.ApplicantRegistration = (req, res) => {
   
    ApplicantModel.create(req.body, (err, data) => {
        if (err) {
            res.status(500).json({ "status": "fail", "data": err })
            console.log(err)
        } else {
            res.status(200).json({ "status": "success", "data": data })
        }
    })

}

exports.ApplicantLogin = (req, res) => {
    const reqBody = req.body;
   
    ApplicantModel.aggregate([
        { $match: reqBody },
        {
            $project: {
                applicant_name: 1,
                job_title: 1,
                gender: 1,
                phone: 1,
                applicant_cv: 1,
                email_address: 1,
                professional_summary: 1,
                profile_image: 1,
                username: 1,
                age: 1,
                salary: 1,
                experience: 1,
                account_status: 1,
                linkedin: 1,
                createDate: 1
            }
        }
    ], (err, data) => {
        if (err) {
            res.status(400).json({ "status": "fail", "data": err })
        } else {
            if (data.length > 0) {
                let Payload = { exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: data[0]["email_address"] };
                let ApplicantToken = jwt.sign(Payload, 'SecretApplicantKey123456789');
                res.status(200).json({ "status": "success", "ApplicantToken": ApplicantToken, "data": data[0] })
            } else {
                res.status(200).json({ "status": "No Applicant Found" })
            }
        }
    })
}

exports.ApplicantProfileUpdate = (req, res) => {
    const id = req.params.applicant_id;
    ApplicantModel.updateOne({ _id: id }, req.body, (err, data) => {
        if (err) {
            res.status(400).json({ "status": "fail", "data": err })
        } else {
            res.status(200).json({ "status": "success", "data": data })
        }
    })

}
exports.ApplicantProfilePicUpdate = async(req, res) => {
    const id = req.params.applicant_id;
    const {profile_image} = req.body
    try{
        const result = await Cloudinary.uploader.upload(profile_image, {
           
        })
       
        ApplicantModel.updateOne({ _id: id }, {profile_image:result.url}, (err, data) => {
            if (err) {
                res.status(400).json({ "status": "fail", "data": err })
            } else {
                res.status(200).json({ "status": "success", "data": data })
            }
        })
    }
    catch(err){
        res.status(500).json({ "status": "fail", "data": err })
    }
}


exports.readApplicantProfile = async (req, res) => {
    const id = req.params.applicant_id
    ApplicantModel.aggregate([
        { $match: { _id: objectId(id) } },
        {
            $project: {
                applicant_name: 1,
                job_title: 1,
                gender: 1,
                phone: 1,
                applicant_cv: 1,
                email_address: 1,
                professional_summary: 1,
                profile_image: 1,
                username: 1,
                age: 1,
                salary: 1,
                experience: 1,
                account_status: 1,
                linkedin: 1,
                createDate: 1
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


//applications
