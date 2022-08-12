const DB = require("./db.json");
// import el paquete de utils para poder usar el metodo saveToDatabase
const { saveToDatabase } = require("./utils");


const getAllRecords = () => {
    try {
      return DB.records;
    } catch (error) {
      throw {status: 500, message: error.message || error};
    }
  };

const getRecordForWorkout = (recordId) => {
  try {
    const record = DB.records.filter((record) => record.workout === recordId);
    if (!record) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${recordId}'`,
      };
    }
    return record;
  } catch (error) {
    throw { status: error.status || 500, message: error.message || error };
  }
};

const createNewRecord = (newRecord) => {
    try {
        const isAlreadyAdded = DB.records.findIndex((record) => record.workout === newRecord.workout) > -1;
        if (isAlreadyAdded) {
            throw {
                status: 404,
                message: `Record with the workout ${newRecord.workout} already exists.`,    
            };
        }
        DB.records.push(newRecord);
        saveToDatabase(DB);
        return newRecord;
    } catch (error) {
        throw { status: 500, message: error.message || error };
    }
}

const updateOneRecord = (recordId, changes) => {
    try {
        const indexForUpdate = DB.records.findIndex((record) => record.id === recordId);
        if (indexForUpdate === -1) {
            throw {
                status: 404,
                message: `Record with the id ${recordId} does not exist.`,
            };
        }
        DB.records[indexForUpdate] = { ...DB.records[indexForUpdate], ...changes };
        saveToDatabase(DB);
        return DB.records[indexForUpdate];
    } catch (error) {
        throw { status: 500, message: error.message || error };
    }
}

const deleteOneRecord = (recordId) => {
    try {
        const indexForDelete = DB.records.findIndex((record) => record.id === recordId);
        if (indexForDelete === -1) {
            throw {
                status: 404,
                message: `Record with the id ${recordId} does not exist.`,
            };
        }
        DB.records.splice(indexForDelete, 1);
        saveToDatabase(DB);
        return { message: `Record with the id ${recordId} has been deleted.` };
    } catch (error) {
        throw { status: 500, message: error.message || error };
    }
}

module.exports = {
    getAllRecords,
    getRecordForWorkout,
    createNewRecord,
    updateOneRecord,
    deleteOneRecord
};

