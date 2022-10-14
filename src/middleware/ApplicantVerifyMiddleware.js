var jwt = require('jsonwebtoken');
module.exports=(req, res, next)=>{
    let token = req.headers["applicantstoken"];
    jwt.verify(token,"SecretApplicantKey123456789",(err, decoded)=>{
        if(err){
            res.status(401).json({status:"unauthorized"})
        } else{
            let email_address=decoded['data'];
            // console.log(email)
            req.headers.email_address=email_address
            next();
        }
    })
}
