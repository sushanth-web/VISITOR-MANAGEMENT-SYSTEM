const adminRegistrationModel = require('../models/AdminModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {sendEmail} = require('../modules/SendEmail')

function generateOTP()
{
    let i=0;
    var otp=''
    var chars="0123456789";
    while(i<6){
        otp+=chars.charAt(Math.floor(Math.random()*chars.length));
        i++;
    }
    return otp;
}

function GenerateAdminID()
  {
    var admin_id="A";
    let i=0;
    var chars="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    while(i<5){
        admin_id+= chars.charAt(Math.floor(Math.random() * chars.length));
        i++;
    }
    return admin_id;

  }

  const adminExist = async(req,res)=>{
    const formData= req.body;

    try{

        const adminEmail = await adminRegistrationModel.findOne({email:formData.email})
        const adminMobile = await adminRegistrationModel.findOne({mobile_no:formData.mobileNo})

        if(adminEmail){
            return  res.status(200).json("Account Already Exist with this Email");
        }else if(adminMobile){
            return  res.status(200).json("Account Already Exist with this Mobile number");
        }else{
            return  res.status(200).json("Not Already Exist!");
        }
        
    }catch(e){
        console.log(e);
        res.status(400).json({error: e.message});
    }
}

const registerAdmin = async(req,res)=>{
    const formData= req.body;
    const salt= await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(formData.password, salt)

    try{
           const admin_info = await adminRegistrationModel.create({
             admin_id:GenerateAdminID(),
             name:formData.name,
             user_name:formData.user_name,
             mobile_no:formData.mobile_no,
             email:formData.email,
             password:hashPassword,
        });
        res.status(200).json(admin_info);
    }
    catch(e)
    {
        res.status(400).json({error: e.message});
    }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await adminRegistrationModel.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const matchPassword = await bcrypt.compare(password, admin.password);

    if (!matchPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      id: admin.admin_id,
      user_name: admin.user_name,
      email: admin.email,
      token: generateToken(admin._id),
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Login failed" });
  }
};


const generateToken= (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY,{
        expiresIn:'10d'
    })
}

const sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const admin = await adminRegistrationModel.findOne({ email });

    if (!admin) {
      return res.status(404).json("Email not found");
    }

    const OTP = generateOTP();
    const expiry = new Date(Date.now() + 2 * 60 * 1000)

    admin.otp = OTP
    admin.otpExpiry = expiry
    await admin.save()

    const messageText = `Your OTP is ${OTP}\nValid for 2 minutes`
    const subject = "Admin Password Reset"

    sendEmail(email, subject, messageText)

    return res.status(200).json("OTP sent successfully")
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}


const updateAdminPassword = async (req, res) => {
  const { email, otp, password } = req.body

  try {
    const admin = await adminRegistrationModel.findOne({ email })

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" })
    }
    // OTP validation with trim and string conversion
if (!admin.otp || admin.otp.toString().trim() !== otp.toString().trim()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Expiry validation
    if (admin.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    admin.password = hashPassword
    admin.otp = undefined
    admin.otpExpiry = undefined

    await admin.save()

    res.status(200).json({ message: "Password updated successfully" });

  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};


module.exports = { 
    adminExist, registerAdmin, adminLogin, sendOTP, updateAdminPassword
}