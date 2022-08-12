
const express = require("express");
const recordController = require("../../controllers/recordController");

const router = express.Router();

// Rutas de la API para el controlador de workouts
router.get("/", recordController.getAllRecords);
router.get("/:recordId", recordController.getOneRecord);
router.post("/", recordController.createNewRecord);
/*router.patch("/:workoutId", recordController.updateOneWorkout);
router.delete("/:workoutId", recordController.deleteOneWorkout); */


module.exports = router;