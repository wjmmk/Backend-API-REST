
// Import the workout service
const workoutService = require("../services/workoutService");


const getAllWorkouts = (req, res) => {
    try {
      const AllWorkouts = workoutService.getAllWorkouts();
      res.send({status: 'OK', data: AllWorkouts, message: 'All workouts retrieved'});
    } catch (error) {
      res.status(error.status || 500)
         .send({status: 'FAILED', data: { error: error.message || error }, message: 'Error getting workouts'});
    }
  };
  
  const getOneWorkout = (req, res) => {
    const { params: {workoutId} } = req;
    if (!workoutId) {
        res.status(400)
           .send({
              status: 'FAILED',
              data: { error: "Parameter ': workoutId' can not be empty" },
              message: 'Missing parameters'
        });
    }

    try {
      const workout = workoutService.getOneWorkout(workoutId);
      res.send({status: 'OK', data: workout, message: 'Workout retrieved'});
    } catch (error) {
      res.status(error.status || 500)
         .send({status: 'FAILED', data: { error: error.message || error }, message: 'Error getting workout'});
    }
  };
  
  const createNewWorkout = (req, res) => {
    const {body} = req;
    if( !body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips){
            res.status(400).send({
              status: 'FAILED', 
              data: { error:
                 "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
              }, 
              message: 'Missing parameters'});
            return;
        }

    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips
    }
  
    try {
      const createdWorkout = workoutService.createNewWorkout(newWorkout);
      res.status(201).send({status: 'OK', data: createdWorkout, message: 'Workout created'});
    } catch (error) {
      res.status(error.status || 500)
         .send({status: 'FAILED', data: { error: error.message || error }, message: 'Error creating workout'});
    }
  };
  
  const updateOneWorkout = (req, res) => {
    const { 
        body,
        params: {workoutId}
    } = req;

    if(!workoutId){
       res.status(400)
       .send({
           status: 'FAILED', 
           data: { error: "Parameter ':workoutId' can not be empty" },
           message: 'Missing parameters'
       });
    }
    
    try {
      const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
      res.send({status: 'OK', data: updatedWorkout, message: 'Workout updated'});
    } catch (error) {
      res.status(error.status || 500)
         .send({status: 'FAILED', data: { error: error.message || error }, message: 'Error updating workout'});
    }
  };
  
  const deleteOneWorkout = (req, res) => {
    const { params: {workoutId} } = req;

    if(!workoutId){return res.send({status: 'ERROR', data: null, message: 'El entrenamiento no existe.'});}
    
    try {
      const deleteWorkout = workoutService.deleteOneWorkout(workoutId);
      res.status(204).send({status: 'DELETED', data: deleteWorkout, message: 'Workout deleted'});
    } catch (error) {
      res.status(error.status || 500)
         .send({status: 'FAILED', data: { error: error.message || error }, message: 'Error deleting workout'});
    } 
  };
  
  module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
  };