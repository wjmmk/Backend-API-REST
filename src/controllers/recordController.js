
// Import the workout service
const recordService= require("../services/recordService");


  const getAllRecords = (req, res) => {
    try {
      const AllRecords = recordService.getAllRecords();
      res.send({status: 'OK', data: AllRecords, message: 'All records retrieved'});
    } catch (error) {
      res.status(error.status || 500)
         .send({status: 'FAILED', data: { error: error.message || error }, message: 'Error getting records'});
    }
  };
  
  const getOneRecord = (req, res) => {
    const { params: {recordId} } = req;
    if (!recordId) {
        res.status(400)
           .send({
              status: 'FAILED',
              data: { error: "Parameter ': recordId' can not be empty" },
              message: 'Missing parameters'
        });
    }

    try {
      const record = recordService.getRecordForWorkout(recordId);
      res.send({status: 'OK', data: record, message: 'Record retrieved'});
    } catch (error) {
      res.status(error.status || 500)
         .send({status: 'FAILED', data: { error: error.message || error }, message: 'Error getting record'});
    }
  };
  
  const createNewRecord = (req, res) => {
    const {body} = req;
    if( !body.workout ||
        !body.record){
            res.status(400).send({
              status: 'FAILED', 
              data: { error:
                 "One of the following keys is missing or is empty in request body: 'workout', 'record'",
              }, 
              message: 'Missing parameters'});
            return;
        }

    const newRecord = {
        workout: body.workout,
        record: body.record,
    }
  
    try {
      const createdRecord = recordService.createNewRecord(newRecord);
      res.status(201).send({status: 'OK', data: createdRecord, message: 'Record created'});
    } catch (error) {
      res.status(error.status || 500)
         .send({status: 'FAILED', data: { error: error.message || error }, message: 'Error creating record'});
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
      const updatedWorkout = recordService.updateOneWorkout(workoutId, body);
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
      const deleteWorkout = recordService.deleteOneWorkout(workoutId);
      res.status(204).send({status: 'DELETED', data: deleteWorkout, message: 'Workout deleted'});
    } catch (error) {
      res.status(error.status || 500)
         .send({status: 'FAILED', data: { error: error.message || error }, message: 'Error deleting workout'});
    } 
  };
  
  module.exports = {
    getAllRecords,
    getOneRecord,
    createNewRecord,
    updateOneWorkout,
    deleteOneWorkout,
  };