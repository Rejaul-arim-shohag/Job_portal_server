const ApplicantModel = require("../model/ApplicantModel");
var jwt = require('jsonwebtoken');
const { cloudinary } = require('../Utilites/Cloudinary');
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

exports.ApplicantRegistration =  async(req, res) => {
   
    // try {
    //     const fileString = req.body.fileString
    //     const uploadResponse = await cloudinary.uploader.upload(fileString, {
    //         upload_preset: 'dev_setups',
    //     });
    //     res.json({ msg: 'yaya' });
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json({ err: 'Something went wrong' });
    // }

    ApplicantModel.create(req.body, (err, data) => {
        if (err) {
            res.status(200).json({ "status": "fail", "data": err })
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
                res.status(201).json({ "status": "No Applicant Found" })
            }
        }
    })
}

exports.ApplicantProfileUpdate =  async(req, res) => {
    const id = req.params.applicant_id
    ApplicantModel.updateOne({_id:id},req.body, (err, data) => {
        if (err) {
            res.status(200).json({ "status": "fail", "data": err })
        } else {
            res.status(200).json({ "status": "success", "data": data })
        }
    })

}

exports.readApplicantProfile =  async(req, res) => {
    const id = req.params.applicant_id
    ApplicantModel.aggregate([
        { $match: {_id:objectId(id)}},
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
            res.status(201).json({ "status": "success", "data":data })
        }
    })

}