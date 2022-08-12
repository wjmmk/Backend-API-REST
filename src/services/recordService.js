// Import UUID library v4
const { v4: uuid } = require("uuid");
const Record = require("../database/RecordDB");

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

const getRecordForWorkout = (workoutId) => {
  try {
    const record = Record.getRecordForWorkout(workoutId);
    return record;
  } catch (error) {
    throw error;
  }
};

const createNewRecord = (newRecord) => {
  // Se parametriza el objeto newWorkout para que pueda agrepar los campos que faltan 
  // 'id' y 'createdAt' y 'updatedAt'
  const recordToInsert = {
      ...newRecord,
      id: uuid(),
      createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

  try {
    const createdRecord = RecordDB.createNewRecord(recordToInsert);
    return createdRecord;
  } catch (error) {
    throw error;
  }
};

module.exports = { 
    getAllRecords, 
    getRecordForWorkout,
    createNewRecord,
};