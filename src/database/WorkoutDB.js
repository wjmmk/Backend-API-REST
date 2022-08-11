
const DB = require("./db.json");
// import el paquete de utils para poder usar el metodo saveToDatabase
const { saveToDatabase } = require("./utils");

const getAllWorkouts = () => {
  return DB.workouts;
};

const getOneWorkout = (workoutId) => {
    const workout = DB.workouts.find((workout) => workout.id === workoutId);
    if(!workout) {
        return;
    }
    return workout;
};

const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Workout with the name ${newWorkout.name} already exists.`,
      };
    }

    try {
      DB.workouts.push(newWorkout);
      saveToDatabase(DB);
      return newWorkout;
    } catch (error) {
      throw { status: 500, message: error.message || error };
    }
  };

const updateOneWorkout = (workoutId, changes) => {
    const indexForUpdate = DB.workouts.findIndex((workout) => workout.id === workoutId);
    if (indexForUpdate === -1) {
      return;
    }
    const workoutToUpdate = {
        ...DB.workouts[indexForUpdate],
        ...changes,
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    }
    DB.workouts[indexForUpdate] = workoutToUpdate;
    saveToDatabase(DB);
    return workoutToUpdate;
};

const deleteOneWorkout = (workoutId) => {
    const indexForDelete = DB.workouts.findIndex((workout) => workout.id === workoutId);
    if (indexForDelete === -1) {
        return;
    }
    const workoutToDelete = DB.workouts[indexForDelete];
    DB.workouts.splice(indexForDelete, 1);
    saveToDatabase(DB);
    return workoutToDelete;
};

module.exports = { 
    getAllWorkouts, 
    createNewWorkout,
    getOneWorkout,
    updateOneWorkout,
    deleteOneWorkout
};