
//Import UUID library v4
const { v4: uuid } = require("uuid");
// import the WorkoutDB
const WorkoutDB = require("../database/WorkoutDB");


const getAllWorkouts = (filterParams) => {
    try {
      const allWorkouts = WorkoutDB.getAllWorkouts(filterParams);
      return allWorkouts;
    } catch (error) {
      throw error;
    }
  };
  
  const getOneWorkout = (workoutId) => {
    try {
      const oneWorkout = WorkoutDB.getOneWorkout(workoutId);
      return oneWorkout;
    } catch (error) {
      throw error;
    }
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
    try {
      const updatedWorkout = WorkoutDB.updateOneWorkout(workoutId, changes);
      return updatedWorkout;
    } catch (error) {
      throw error;    
    }
  };
  
  const deleteOneWorkout = (workoutId) => {
    try {
      const deletedWorkout = WorkoutDB.deleteOneWorkout(workoutId);
      return deletedWorkout;
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
  };