const mongoose = require("mongoose");
const adminRegistrationModel = require("../models/AdminModel");
require("dotenv").config();

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

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await adminRegistrationModel.insertMany([
    {
    admin_id:GenerateAdminID(),
    name:"Admin123",
    user_name:"Admin12345",
    mobile_no:"9876543210",
    email:"Admin123@gmail.com",
    password:"Hibro123"
    }
  ]);

  console.log("✅ Database seeded successfully");
  process.exit();
});
