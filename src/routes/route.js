const express = require('express');
const router = express.Router();

const multer = require("multer");
const memoryStorage = multer.memoryStorage();
const upload = multer({
    storage: memoryStorage,
});
// const { upload, cloudinary } = require('../Utilites/Cloudinary');

//authentication verify middleware
const adminVerifyMiddleware = require("../middleware/AdminVerifyMiddleware");
const ApplicantVerifyMiddleware = require("../middleware/ApplicantVerifyMiddleware");
const EmployerVerifyMiddleware = require("../middleware/EmployerMiddleware");


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
router.post("/updateJobCategory/:job_category_id", JobCategoryController.updateJobCategory);

//job type 
router.post("/jobTypeCreate",adminVerifyMiddleware, JobTypeController.jobTypeCreate);
router.get("/jobTypeRead", JobTypeController.jobTypeRead);

//Location
router.post("/CreationLocation",adminVerifyMiddleware, LocationController.CreationLocation);
router.get("/readLocations", LocationController.readLocations);


//applicant route

router.post("/ApplicantRegistration", ApplicantController.ApplicantRegistration);
router.post("/ApplicantLogin", ApplicantController.ApplicantLogin);
router.post("/ApplicantProfileUpdate/:applicant_id",ApplicantVerifyMiddleware, ApplicantController.ApplicantProfileUpdate);
router.post("/ApplicantProfilePicUpdate/:applicant_id",ApplicantVerifyMiddleware, ApplicantController.ApplicantProfilePicUpdate);

router.get("/readApplicantProfile/:applicant_id", ApplicantController.readApplicantProfile);


//employer route 
router.post("/registrationCompany", EmployerController.registrationCompany);
router.post("/EmployerLogin", EmployerController.EmployerLogin);
router.post("/CompanyProfileUpdate/:company_id",EmployerVerifyMiddleware, EmployerController.CompanyProfileUpdate);

router.get("/readCompanyProfile/:id", EmployerController.readCompanyProfile);
router.post("/EmployerProfilePicUpdate/:id",EmployerVerifyMiddleware, EmployerController.EmployerProfilePicUpdate);


//job route
router.post("/CreateJob",EmployerVerifyMiddleware, JobController.CreateJob);
router.post("/readJobs/:pageNo/:parPage", JobController.readJobs);
router.get("/readJobById/:job_id", JobController.readJobById);
router.get("/readJobsByCompanyId/:company_id",EmployerVerifyMiddleware, JobController.readJobsByCompanyId);



//application detail route 
router.post("/CreateJobApply",ApplicantVerifyMiddleware, ApplicationDetailsController.CreateJobApply);
router.get("/readApplicantJobs/:applicant_id",ApplicantVerifyMiddleware, ApplicationDetailsController.readApplicantJobs);
router.get("/readEmployerJobDetails/:company_Id",EmployerVerifyMiddleware, ApplicationDetailsController.readEmployerJobDetails);



module.exports=router;