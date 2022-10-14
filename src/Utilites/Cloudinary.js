const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dub6q8hhb",
    api_key: "144472259946715",
    api_secret: "W2KLFS-3mz5xWPZToqDZpkSlPwc",
    secure: true
});
module.exports = { cloudinary };