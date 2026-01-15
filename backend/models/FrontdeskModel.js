const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FrontdeskSchema = new Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Admin",
    },

    visitor_id: {
      type: String,
      required: true,
    },

    visitor_name: {
      type: String,
      required: true
    },

    visitor_designation: {
      type: String,
      required: true,
    },

    visitor_mobileNo: {
      type: String,
      required: true,
    },

    employee_id: {
      type: String,
      required: true
    },

    employee_email: {
      type: String,
      required: true,
    },

    visit_purpose: {
      type: String,
      required: true,
    },

    visit_date: {
      type: Date,
      required: true,
    },

    visit_startTime: {
      type: String,
      required: true,
    },

    visit_endTime: {
      type: String,
      required: false,
    },

    allotted_visit_duration: {
      type: String,
      required: false,
    },

    visitor_status: {
      type: String,
      required: true,
    },

    checkIn: {
      type: String,
    },

    checkOut: {
      type: String,
    },

    visit_status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const checkInOutModel = mongoose.model("frontdesk_details",FrontdeskSchema)

module.exports = checkInOutModel
