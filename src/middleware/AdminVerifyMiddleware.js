var jwt = require('jsonwebtoken');
module.exports=(req, res, next)=>{
    let adminToken = req.headers.admintoken;
    jwt.verify(adminToken,"SecretKey123456789",(err, decoded)=>{
        if(err){
            res.status(401).json({status:"unauthorized"})
        } else{
            let admin_email=decoded['data'];
            req.headers.admin_email=admin_email
            next();
        }
    })
}