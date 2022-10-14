const express = require('express');
const router = express.Router();

//authentication verify middleware
const adminVerifyMiddleware = require("../middleware/AdminVerifyMiddleware")
const ApplicantVerifyMiddleware = require("../middleware/ApplicantVerifyMiddleware")
const EmployerVerifyMiddleware = require("../middleware/EmployerMiddleware")

//controller 
const AdminController = require("../controller/AdminController");
const JobCategoryController = require("../controller/JobCategoryController");
const JobTypeController = require("../controller/JobTypeController");
const LocationController = require("../controller/LocationController");

const ApplicantController = require("../controller/ApplicantController");
const EmployerController = require("../controller/CompanyController");
const JobController = require("../controller/JobController");

const ApplicationDetailsController = require("../controller/ApplicationDetailsController");



//Admin route
router.post("/createAdmin", AdminController.AdminRegistration);
router.post("/loginAdmin", AdminController.AdminLogin);
router.post("/AdminProfileUpdate",adminVerifyMiddleware, AdminController.AdminProfileUpdate);

//job category 
router.post("/jobCategoryCreate",adminVerifyMiddleware, JobCategoryController.jobCategoryCreate);
router.get("/jobCategoryRead", JobCategoryController.jobCategoryRead);

//job type 
router.post("/jobTypeCreate",adminVerifyMiddleware, JobTypeController.jobTypeCreate);
router.get("/jobTypeRead", JobTypeController.jobTypeRead);

//Location
router.post("/CreationLocation",adminVerifyMiddleware, LocationController.CreationLocation);


//applicant route 
router.post("/ApplicantRegistration", ApplicantController.ApplicantRegistration);
router.post("/ApplicantLogin", ApplicantController.ApplicantLogin);
router.post("/ApplicantProfileUpdate/:applicant_id",ApplicantVerifyMiddleware, ApplicantController.ApplicantProfileUpdate);
router.get("/readApplicantProfile/:applicant_id", ApplicantController.readApplicantProfile);


//employer route 
router.post("/registrationCompany", EmployerController.registrationCompany);
router.post("/EmployerLogin", EmployerController.EmployerLogin);
router.post("/CompanyProfileUpdate/:company_id",EmployerVerifyMiddleware, EmployerController.CompanyProfileUpdate);

//job route
router.post("/CreateJob",EmployerVerifyMiddleware, JobController.CreateJob);

//application detail route 
router.post("/CreateJobApply",ApplicantVerifyMiddleware, ApplicationDetailsController.CreateJobApply);











module.exports=router;