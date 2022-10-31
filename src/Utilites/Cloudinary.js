const cloudinary =  require('cloudinary').v2; ;
// const multer = require("multer");
// const memoryStorage = multer.memoryStorage();
// const upload = multer({
//     storage: memoryStorage,
// });

cloudinary.config({
    cloud_name: "dub6q8hhb",
    api_key: "144472259946715",
    api_secret: "W2KLFS-3mz5xWPZToqDZpkSlPwc",
});





// const uploadToCloudinary = async (fileString) => {
//     try {
//         const { uploader } = cloudinary;
//         const uploadResponse = await uploader.upload(
//             `data:image/${format};base64,${fileString}`
//         );
//         req.body.profile_image = uploadResponse.url;
//         next()
//     } catch (error) {
//         return error
//     }
// };
module.exports = cloudinary;