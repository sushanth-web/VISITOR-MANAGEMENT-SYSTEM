const express=require("express")
const router=express.Router();
const {auth} =require("../middlewares/Auth.js")


const { PreRegister,GetPreRegisterDetails,GetSinglePreRegisterData,
      updatePreRegisterData,  deleteSinglePreRegisterData,}=require("../controllers/PreregisterController.js");
      
router.post("/",auth,PreRegister)
router.get("/",auth,GetPreRegisterDetails)
router.get("/:id", auth,GetSinglePreRegisterData)
router.patch("/:id", auth, updatePreRegisterData)
router.delete("/:id",auth, deleteSinglePreRegisterData)

module.exports=router;