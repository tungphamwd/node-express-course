const express = require("express");
const router = express.Router();
const { getPeople, addPeople, getPerson, deletePerson} = require("../controllers/people");

router.get("/", getPeople);
router.get("/:id", getPerson);
router.post("/", addPeople);
router.delete("/:id", deletePerson);
module.exports = router;
