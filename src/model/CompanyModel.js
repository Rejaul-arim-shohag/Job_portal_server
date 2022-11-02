const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    company_name: { type: String,  default: "" },
    company_address: { type: String,default: ""  },
    company_contact: { type: String,default: ""  },
    company_email: { type: String, unique: true },
    company_website: { type: String, default: "" },
    professional_summary: { type: String, default: ""  },
    profile_image: { type: String, default:"https://res.cloudinary.com/dub6q8hhb/image/upload/v1667057849/icon/noLogo_d6azgv.png" },
    founded_date: { type:String, default: ""  },
    company_size: { type: String, default: ""  },
    categories: { type: String, default: ""  },
    password: { type: String },
    account_status: { type: String, default: "1" },
    linkedin: { type: String, default: "" },
    createDate: { type: Date, default: Date.now() },
}, { versionKey: false });

const CompanyModel = mongoose.model("companies", Schema);
module.exports = CompanyModel;