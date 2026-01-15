const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PreRegisterSchema= new Schema(
    {    
        admin:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Admin'
          },

          visitor_id:{
            type:String,
            required:true
          },
          name:{
            type:String,
            required:true
          },

          gender:{
            type:String,
            required:true
          },

          age:{
            type:Number,
            required:true
          },

          designation:{
            type:String,
            required:true
          },

          mobile_no:{
            type:String,
            required:true,
            unique:true
          },
          employee_name:{
            type:String,
            required:true
          },
          employee_email:{
            type:String,
            unique:false
          },
          email:{
            type:String,
            unique:false
          },

          address:{
            type:String,
            required:true
          },
         check_in: { type: String, required:false },
check_out: { type: String, required:false }

    },
    {timestamps:true}
);

const PreRegisterModel = mongoose.model("pre_register_details", PreRegisterSchema);

module.exports = PreRegisterModel;