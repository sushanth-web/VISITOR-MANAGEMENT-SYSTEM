const express =require("express")
const router =express.Router()
const { auth }= require("../middlewares/Auth.js")

const{
  checkInOutVisitor,
  getCheckInOutDetails,
  getSingleCheckInOutData,
  updateSingleCheckInOutData,
  deleteSingleCheckInOutData,
  getCheckInOutByVisitorId,
} =require("../controllers/FrontdeskController.js")

router.post("/",auth,checkInOutVisitor)
router.get("/",auth,getCheckInOutDetails)
router.get("/:id",auth,getSingleCheckInOutData)
router.get("/visitor/:id",auth,getCheckInOutByVisitorId)
router.patch("/:id",auth,updateSingleCheckInOutData)
router.delete("/:id",auth,deleteSingleCheckInOutData)

module.exports = router
