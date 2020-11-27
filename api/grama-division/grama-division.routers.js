const router = require("express").Router();
const {
  getGramaDivisionByGramaDivisionID,
  createGramaDivision,
  getGramaDivisions,
  updateGramaDivision,
  deleteGramaDivision,
  getToBeVerifyList,
  getGramaDivisionsToSelectBox
} = require("./grama-division.controllers");
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createGramaDivision);
router.get("/selectbox",checkToken,getGramaDivisionsToSelectBox);
router.get("/", checkToken, getGramaDivisions);

router.get("/verifylist/:gram_div_id", checkToken, getToBeVerifyList);
router.get("/:gram_div_id", checkToken, getGramaDivisionByGramaDivisionID);
router.patch("/", checkToken, updateGramaDivision);
router.delete("/", checkToken, deleteGramaDivision);

module.exports = router;
