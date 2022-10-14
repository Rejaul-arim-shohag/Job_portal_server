var jwt = require('jsonwebtoken');
module.exports=(req, res, next)=>{
    let employer_token = req.headers["employer_token"];
    jwt.verify(employer_token,"SecretEmployerKey123456789",(err, decoded)=>{
        if(err){
            res.status(401).json({status:"unauthorized"})
        } else{
            let company_email=decoded['data'];
            // console.log(email)
            req.headers.company_email=company_email
            next();
        }
    })
}

