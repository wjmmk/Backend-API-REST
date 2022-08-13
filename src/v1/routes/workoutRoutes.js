
const express = require("express");
const workoutController = require("../../controllers/workoutController");
const recordController = require("../../controllers/recordController");

const router = express.Router();

// Rutas de la API para el controlador de workouts
router.get("/", workoutController.getAllWorkouts);
router.get("/:workoutId", workoutController.getOneWorkout);
router.post("/", workoutController.createNewWorkout);
router.patch("/:workoutId", workoutController.updateOneWorkout);
router.delete("/:workoutId", workoutController.deleteOneWorkout);

// Rutas de la API para el asocio de los controladores de Workout y Records
router.get("/:workoutId/records", recordController.getRecordForWorkout);

module.exports = router;