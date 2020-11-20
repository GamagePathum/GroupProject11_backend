
const router = require("express").Router(); 
const { 
    createOfficer,
    getOfficers,
    getOfficerByOfficerID,
    updateOfficers,
    deleteOfficers
} = require("./post_officer.controller");

const { checkToken } = require("../../auth/token_validation");


router.post("/",createOfficer);
router.get("/",checkToken,getOfficers);
router.get("/:user_id",checkToken,getOfficerByOfficerID);
router.patch("/",checkToken,updateOfficers);
router.delete("/",checkToken,deleteOfficers);



module.exports = router;