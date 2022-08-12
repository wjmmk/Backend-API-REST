
const express = require("express");
const recordController = require("../../controllers/recordController");

const router = express.Router();

// Rutas de la API para el controlador de workouts
router.get("/", recordController.getAllRecords);
router.get("/:recordId", recordController.getOneRecord);
router.post("/", recordController.createNewRecord);
router.patch("/:recordId", recordController.updateOneRecord);
router.delete("/:recordId", recordController.deleteOneRecord);


module.exports = router;