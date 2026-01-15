const { mongoose } = require("mongoose");
const PreRegisterModel =require("../models/PreregisterModel.js");
const {sendEmail} = require('../modules/SendEmail')

function GenerateVisitorID()
  {
    var visitor_id="V";
    let i=0;
    var chars="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    while(i<5){
        visitor_id+= chars.charAt(Math.floor(Math.random() * chars.length));
        i++;
    }
    return visitor_id;

  }

  const PreRegister = async (req, res) => {
  const formData = req.body;

  try {
    if (formData.email && formData.email !== "") {
      const visitorEmail = await PreRegisterModel.findOne({ email: formData.email });
      if (visitorEmail) {
        return res.status(200).json("Account Already Exist with this Email");
      }
    }

    const visitorMobile = await PreRegisterModel.findOne({ mobile_no: formData.mobile_no });
    if (visitorMobile) {
      return res.status(200).json("Account Already Exist with this Mobile number");
    }

    const visitor_info = await PreRegisterModel.create({
      admin: req.admin._id,
      visitor_id: GenerateVisitorID(),
      name: formData.name,
      gender: formData.gender,
      age: formData.age,
      designation: formData.designation,
      mobile_no: formData.mobile_no,
      employee_name: formData.employee_name,
      employee_email: formData.employee_email,
      email: formData.email,
      address: formData.address,
      check_in:formData.check_in || "",
        check_out:formData.check_out || ""
    });

    //  SEND EMAIL AFTER SUCCESSFUL REGISTRATION
    if (formData.employee_email) {
      const subject = "PreRegistration Notification";
      const messageText = `
            Hello ${formData.employee_name || "Employee"},

            A visitor has been pre-registered under your name.

            Visitor Details:
            Name: ${formData.name}
            Mobile: ${formData.mobile_no}
            Designation: ${formData.designation}

            Please be informed.

            Regards,
            Visitor Management System
                `;

      await sendEmail(formData.employee_email, subject, messageText);
    }

    return res.status(200).json(visitor_info);

  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
};

const GetPreRegisterDetails = async(req,res)=>{
    try{
        const visitors_details = await PreRegisterModel.find({admin:req.admin._id});
        res.status(200).json(visitors_details);
    }
    catch(e)
    {
        res.status(400).json({error: e.message});
    }
};


const GetSinglePreRegisterData = async(req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({message: "visitor not found"});
    }
    try{

        const visitor_data = await PreRegisterModel.findById(id);

        if (!visitor_data) {
            return res.status(404).json({ message: "Visitor not found" });
        }

        if(visitor_data.admin.toString() != req.admin._id.toString()){
              return  res.status(401).json({message: "Admin not Authorized"});
        }
       
        res.status(200).json(visitor_data);
    }
    catch(e)
    {
        res.status(400).json({error: e.message});
    }
};

const updatePreRegisterData = async(req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
       return res.status(400).json({message: "visitor not found"});
    }
    try{

        const visitor = await PreRegisterModel.findById(id);

        if(!visitor){
            return res.status(404).json({ message: "visitor not found" });
        }

        if(visitor.admin.toString() != req.admin._id.toString()){
              return  res.status(401).json({message: "Admin not Authorized"});
        }

        if(req.body.email!=='' && visitor.email!==req.body.email)
        {
            const visitorEmail = await PreRegisterModel.findOne({email:req.body.email})
        
            if(visitorEmail){
                return  res.status(200).json("Email Already Exist");
            }
        }
        
         if(visitor.mobile_no!==req.body.mobile_no)
         {
            const visitorMobile = await PreRegisterModel.findOne({mobile_no:req.body.mobile_no})
             if(visitorMobile){
                return  res.status(200).json("Mobile Number Already Exist");
             }
        }   

        const visitor_data = await PreRegisterModel.findByIdAndUpdate({
            _id:id
        }, 
        {
            ...req.body
         });
       
        res.status(200).json(visitor_data);
    }
    catch(e)
    {
        console.log(e);
        res.status(400).json({error: e.message});
    }
};


const deleteSinglePreRegisterData = async(req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).json({message: "visitor not found"});
    }
    try{
  const visitor = await PreRegisterModel.findById(id);
        if(!visitor){
            return res.status(404).json({ message: "visitor not found" });
        }

        if(visitor.admin.toString() != req.admin._id.toString()){
              return  res.status(401).json({message: "Admin not Authorized"});
        }

        await PreRegisterModel.findByIdAndDelete(id);      
       
        res.status(200).json("visitor data deleted successfully");
    }
    catch(e)
    {
        res.status(400).json({error: e.message});
    }
};

module.exports = { PreRegister, GetPreRegisterDetails, GetSinglePreRegisterData,
      updatePreRegisterData,  deleteSinglePreRegisterData };