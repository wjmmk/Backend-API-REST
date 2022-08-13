
const DB = require("./db.json");
// import el paquete de utils para poder usar el metodo saveToDatabase
const { saveToDatabase } = require("./utils");

const getAllWorkouts = (filterParams) => {
  try {
    let workouts = DB.workouts;
    if(filterParams.mode) {
      return DB.workouts.filter((workout) => workout.mode.toLowerCase().includes(filterParams.mode));
    }
    if(filterParams.name) {
      return DB.workouts.filter((workout) => workout.name.toLowerCase().includes(filterParams.name));
    }
    if(filterParams.exercises) {
      return DB.workouts.filter((workout) => workout.exercises.toLocaleString().includes(filterParams.exercises));
    }
    if(filterParams.equipment) {
      return DB.workouts.filter((workout) => workout.equipment.toLocaleString().includes(filterParams.equipment));
    }
    // Other if-statements can be added here for different parameters
    return workouts;
  } catch (error) {
    throw {status: 500, message: error.message || error};
  }
};

const getOneWorkout = (workoutId) => {
    try {
      const workout = DB.workouts.find((workout) => workout.id === workoutId);
      if(!workout) {
          throw {
            status: 404, 
            message: `Workout with the id ${workoutId} already exists.`,
          };
      }
    return workout;
    } catch (error) {
      throw { status: error.status || 500, message: error.message || error };
    }
};

const createNewWorkout = (newWorkout) => {
    try {
      const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
      if (isAlreadyAdded) {
        throw {
          status: 404,
          message: `Workout with the name ${newWorkout.name} already exists.`,
        };
      }
      DB.workouts.push(newWorkout);
      saveToDatabase(DB);
      return newWorkout;
    } catch (error) {
      throw { status: 500, message: error.message || error };
    }
  };

const updateOneWorkout = (workoutId, changes) => {
    try {

      const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === changes.name) > -1;
      if (isAlreadyAdded) {
        throw {
          status: 404,
          message: `Workout with the name ${changes.name} already exists.`,
        };
      }

      const indexForUpdate = DB.workouts.findIndex((workout) => workout.id === workoutId);
      if (indexForUpdate === -1) {
        throw {
          status: 404,
          message: `Workout with the id ${workoutId} does not exist.`,
        };
      }

      const workoutToUpdate = {
          ...DB.workouts[indexForUpdate],
          ...changes,
          updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      }

      DB.workouts[indexForUpdate] = workoutToUpdate;
      saveToDatabase(DB);
      return workoutToUpdate;
    } catch (error) {
      throw { status: error.status || 500, message: error.message || error };
    }
};

const deleteOneWorkout = (workoutId) => {
    try {
      const indexForDelete = DB.workouts.findIndex((workout) => workout.id === workoutId);
      if (indexForDelete === -1) {
          throw {
            status: 404,
            message: `Workout with the id ${workoutId} does not exist.`,
          };
      }
      const workoutToDelete = DB.workouts[indexForDelete];
      DB.workouts.splice(indexForDelete, 1);
      saveToDatabase(DB);
      return workoutToDelete;
    } catch (error) {
      throw { status: error.status || 500, message: error.message || error };      
    }
};

module.exports = { 
    getAllWorkouts, 
    createNewWorkout,
    getOneWorkout,
    updateOneWorkout,
    deleteOneWorkout
};