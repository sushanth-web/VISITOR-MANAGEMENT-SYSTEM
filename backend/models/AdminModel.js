const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AdminSchema = new Schema({
  admin_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  mobile_no: {
    type: String,
    required: true,
    unique:true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  otp: {
  type: String
  },
  otpExpiry: {
    type: Date
  }
},{timestamps:true})

const adminRegistrationModel = mongoose.model("Admin", AdminSchema)
module.exports = adminRegistrationModel