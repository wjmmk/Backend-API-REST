const DB = require("./db.json");
// import el paquete de utils para poder usar el metodo saveToDatabase
const { saveToDatabase } = require("./utils");


const getAllMembers = () => {
    try {
      return DB.members;
    } catch (error) {
      throw {status: 500, message: error.message || error};
    }
  };

const getOneMember = (memberId) => {
  try {
    const member = DB.members.filter((member) => member.id === memberId);
    if (!member) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${memberId}'`,
      };
    }
    return member;
  } catch (error) {
    throw { status: error.status || 500, message: error.message || error };
  }
};

const createNewMember = (newMember) => {
    try {
        const isAlreadyAdded = DB.members.findIndex((member) => member.email === newMember.email) > -1;
        if (isAlreadyAdded) {
            throw {
                status: 404,
                message: `Member with the email ${newMember.workout} already exists.`,    
            };
        }
        DB.members.push(newMember);
        saveToDatabase(DB);
        return newMember;
    } catch (error) {
        throw { status: 500, message: error.message || error };
    }
}

const updateOneMember = (memberId, changes) => {
    try {
        const indexForUpdate = DB.members.findIndex((member) => member.id === memberId);
        if (indexForUpdate === -1) {
            throw {
                status: 404,
                message: `Member with the id ${memberId} does not exist.`,
            };
        }
        DB.members[indexForUpdate] = { ...DB.members[indexForUpdate], ...changes };
        saveToDatabase(DB);
        return DB.members[indexForUpdate];
    } catch (error) {
        throw { status: 500, message: error.message || error };
    }
}

const deleteOneMember = (memberId) => {
    try {
        const indexForDelete = DB.members.findIndex((member) => member.id === memberId);
        if (indexForDelete === -1) {
            throw {
                status: 404,
                message: `Member with the id ${memberId} does not exist.`,
            };
        }
        DB.members.splice(indexForDelete, 1);
        saveToDatabase(DB);
        return { message: `Member with the id ${memberId} has been deleted.` };
    } catch (error) {
        throw { status: 500, message: error.message || error };
    }
}

module.exports = {
    getAllMembers,
    getOneMember,
    createNewMember,
    updateOneMember,
    deleteOneMember
};

