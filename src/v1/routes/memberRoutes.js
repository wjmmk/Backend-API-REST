const express = require("express");
const memberController = require("../../controllers/memberController");

const router = express.Router();

// Rutas de la API para el controlador de workouts
router.get("/", memberController.getAllMembers);
router.get("/:memberId", memberController.getOneMember);
router.post("/", memberController.createNewMember);
router.patch("/:memberId", memberController.updateOneMember);
router.delete("/:memberId", memberController.deleteOneMember);


module.exports = router;