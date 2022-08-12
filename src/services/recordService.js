// Import UUID library v4
const { v4: uuid } = require("uuid");
// import the RecordDB
const RecordDB = require("../database/RecordDB");

const getAllRecords = () => {
    try {
      const allRecords = RecordDB.getAllRecords();
      return allRecords;
    } catch (error) {
      throw error;
    }
  };

  const getOneRecord = (recordId) => {
    try {
      const oneRecord = RecordDB.getOneRecord(recordId);
      return oneRecord;
    } catch (error) {
      throw error;
    }
  };

const getRecordForWorkout = (workoutId) => {
  try {
    const record = RecordDB.getRecordForWorkout(workoutId);
    return record;
  } catch (error) {
    throw error;
  }
};

const createNewRecord = (newRecord) => {
  // Se parametriza el objeto newWorkout para que pueda agrepar los campos que faltan 
  const recordToInsert = {
      ...newRecord,
      id: uuid(),
      /* createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }), */
    };

  try {
    const createdRecord = RecordDB.createNewRecord(recordToInsert);
    return createdRecord;
  } catch (error) {
    throw error;
  }
};

const updateOneRecord = (recordId, changes) => {
  try {
    const updatedRecord = RecordDB.updateOneRecord(recordId, changes);
    return updatedRecord;
  } catch (error) {
    throw error;    
  }
};

const deleteOneRecord = (recordId) => {
  try {
    const deletedRecord = RecordDB.deleteOneRecord(recordId);
    return deletedRecord;
  } catch (error) {
    throw error;
  }
};

module.exports = { 
    getAllRecords, 
    getOneRecord,
    getRecordForWorkout,
    createNewRecord,
    updateOneRecord,
    deleteOneRecord
};