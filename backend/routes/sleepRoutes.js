
const router=require("express").Router();
router.get("/",(req,res)=>res.json({msg:"sleep route working"}));
module.exports=router;
