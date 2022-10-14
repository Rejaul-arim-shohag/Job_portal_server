const mongoose = require("mongoose");
const Schema = mongoose.Schema({
    location_name: { type: String, require:true},
    admin_id:{ type: mongoose.Schema.ObjectId }, 
    createDate: { type: Date, default: Date.now()},
}, { versionKey: false });

const LocationModel = mongoose.model("locations", Schema);
module.exports = LocationModel;