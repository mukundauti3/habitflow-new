
const router=require("express").Router();
router.get("/",(req,res)=>res.json({msg:"note route working"}));
module.exports=router;
