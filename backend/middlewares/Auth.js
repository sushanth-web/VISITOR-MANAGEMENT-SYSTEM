const AdminRegistrationModel=require("../models/AdminModel");
const jwt =require('jsonwebtoken')

const auth = async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{

            token= req.headers.authorization.split(' ')[1];
            const decode=jwt.verify(token,process.env.JWT_SECRET_KEY);
            req.admin=await AdminRegistrationModel.findById(decode.id).select('-password')
            next()
        }catch(e){ 
           return res.status(401).json({message :"Auth Failed, Wrong Token"})
        }
        if(!token){
            return res.status(401).json({message :"Auth Failed, Token Not Found"})
        }
    }
} 

module.exports={auth}