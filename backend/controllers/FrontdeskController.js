const mongoose = require("mongoose");
const moment = require("moment")
const checkInOutModel = require("../models/FrontdeskModel")

const checkInOutVisitor = async (req, res) => {
  try {
    const formData = req.body
    const { visitor_id } = formData

    if (!visitor_id) {
      return res.status(400).json("Visitor ID is required")
    }

    
    const existing = await checkInOutModel.findOne({ visitor_id })

    const checkTime = moment().format("hh:mm A")
    const today = new Date().setHours(0, 0, 0, 0)
    if (existing && existing.visit_status === "Invalid") {
      return res.status(200).json("Visitor Pass Invalid")
    }

    // CHECK-OUT
    if (existing && existing.visitor_status === "In") {
      await checkInOutModel.findOneAndUpdate(
        { visitor_id },
        {
          checkOut: checkTime,
          visitor_status: "Out",
          visit_status: "Invalid",
        }
      )

      return res.status(200).json("Visitor Check Out Success")
    }

    const {
      visitor_name,
      visitor_designation,
      visitor_mobileNo,
      employee_id,
      employee_email,
      visit_purpose,
      visit_date,
      visit_startTime,
      visit_endTime,
      allotted_visit_duration,
    } = formData

    if (
      !visitor_name ||
      !visitor_mobileNo ||
      !employee_id ||
      !employee_email ||
      !visit_purpose
    ) {
      return res
        .status(400)
        .json("Required visitor/employee fields are missing")
    }

    const visitDateValue = visit_date
      ? new Date(visit_date).setHours(0, 0, 0, 0)
      : today

    if (visitDateValue < today) {
      return res.status(200).json("Visit Date Expired")
    }
    if (visitDateValue > today) {
      return res.status(200).json("Visit Date Not Arrive")
    }

    await checkInOutModel.create({
      admin: req.admin._id,
      visitor_id,
      visitor_name,
      visitor_designation,
      visitor_mobileNo,
      employee_id,
      employee_email,
      visit_purpose,
      visit_date: visitDateValue,
      visit_startTime: visit_startTime || checkTime,
      visit_endTime: visit_endTime || "",
      allotted_visit_duration: allotted_visit_duration || "",
      checkIn: checkTime,
      checkOut: "",
      visitor_status: "In",
      visit_status: "Valid",
    })

    return res.status(200).json("Visitor Check In Success")
  } catch (e) {
    console.log(e)
    return res.status(400).json({ error: e.message })
  }
}
const getCheckInOutDetails = async (req, res) => {
  try {
    const data = await checkInOutModel.find({
      admin: req.admin._id,
    })
    res.status(200).json(data)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
};

// GET single by Mongo ID
const getSingleCheckInOutData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json("Data not found");
  }

  const data = await checkInOutModel.findById(id);

  if (!data) return res.status(404).json("Data not found");

  if (data.admin.toString() !== req.admin._id.toString()) {
    return res.status(401).json("Admin not Authorized");
  }

  res.status(200).json(data);
};

  // GET by visitor_id
  const getCheckInOutByVisitorId = async (req, res) => {
    const { id } = req.params;

    const record = await checkInOutModel.findOne({ visitor_id: id });

    if (!record) {
      return res.status(200).json("Invalid Visitor ID");
    }

    if (record.admin.toString() !== req.admin._id.toString()) {
      return res.status(401).json("Admin not Authorized");
    }

    res.status(200).json(record);
  };

    // UPDATE
    const updateSingleCheckInOutData = async (req, res) => {
      const { id } = req.params;

      const updated = await checkInOutModel.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );

      res.status(200).json(updated);
    };

    // DELETE
    const deleteSingleCheckInOutData = async (req, res) => {
      const { id } = req.params;

      await checkInOutModel.findByIdAndDelete(id);

      res.status(200).json("Deleted Successfully");
};

  module.exports = {
    checkInOutVisitor,
    getCheckInOutDetails,
    getSingleCheckInOutData,
    updateSingleCheckInOutData,
    deleteSingleCheckInOutData,
    getCheckInOutByVisitorId,
  };
