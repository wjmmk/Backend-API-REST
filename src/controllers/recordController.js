
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
  
  const updateOneRecord = (req, res) => {
    const { 
        body,
        params: {recordId}
    } = req;

    if(!recordId){
       res.status(400)
       .send({
           status: 'FAILED', 
           data: { error: "Parameter ':recordId' can not be empty" },
           message: 'Missing parameters'
       });
    }
    
    try {
      const updatedRecord = recordService.updateOneRecord(recordId, body);
      res.send({status: 'OK', data: updatedRecord, message: 'Record updated'});
    } catch (error) {
      res.status(error.status || 500)
         .send({status: 'FAILED', data: { error: error.message || error }, message: 'Error updating record'});
    }
  };
  
  const deleteOneRecord = (req, res) => {
    const { params: {recordId} } = req;

    if(!recordId){return res.send({status: 'ERROR', data: null, message: 'record does not exist.'});}
    
    try {
      const deleteRecord = recordService.deleteOneRecord(recordId);
      res.status(204).send({status: 'DELETED', data: deleteRecord, message: 'Record deleted'});
    } catch (error) {
      res.status(error.status || 500)
         .send({status: 'FAILED', data: { error: error.message || error }, message: 'Error deleting record'});
    } 
  };
  
  module.exports = {
    getAllRecords,
    getOneRecord,
    createNewRecord,
    updateOneRecord,
    deleteOneRecord,
  };