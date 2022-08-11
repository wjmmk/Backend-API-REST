
//Import UUID library v4
const { v4: uuid } = require("uuid");
// import the WorkoutDB
const WorkoutDB = require("../database/WorkoutDB");


const getAllWorkouts = () => {
    const allWorkouts = WorkoutDB.getAllWorkouts();
    return allWorkouts;
  };
  
  const getOneWorkout = (workoutId) => {
    const oneWorkout = WorkoutDB.getOneWorkout(workoutId);
    return oneWorkout;
  };
  
  const createNewWorkout = (newWorkout) => {
    // Se parametriza el objeto newWorkout para que pueda agrepar los campos que faltan 
    // 'id' y 'createdAt' y 'updatedAt'
    const workoutToInsert = {
        ...newWorkout,
        id: uuid(),
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      };

    try {
      const createdWorkout = WorkoutDB.createNewWorkout(workoutToInsert);
      return createdWorkout;
    } catch (error) {
      throw error;
    }
  };
  
  const updateOneWorkout = (workoutId, changes) => {
    const updatedWorkout = WorkoutDB.updateOneWorkout(workoutId, changes);
    return updatedWorkout;
  };
  
  const deleteOneWorkout = (workoutId) => {
    const deletedWorkout = WorkoutDB.deleteOneWorkout(workoutId);
    return deletedWorkout;
  };
  
  module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
  };