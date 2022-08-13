const express = require("express");
const memberController = require("../../controllers/memberController");

const router = express.Router();

// Rutas de la API para el controlador de workouts
router.get("/", memberController.getAllMembers);
router.get("/:recordId", memberController.getOneMember);
router.post("/", memberController.createNewMember);
router.patch("/:recordId", memberController.updateOneMember);
router.delete("/:recordId", memberController.deleteOneMember);


module.exports = router;