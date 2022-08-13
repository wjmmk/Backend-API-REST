// Import UUID library v4
const { v4: uuid } = require("uuid");
// import the MemberDB
const MemberDB = require("../database/MemberDB");

const getAllMembers = () => {
    try {
      const allMembers = MemberDB.getAllMembers();
      return allMembers;
    } catch (error) {
      throw error;
    }
  };

const getOneMember = (memberId) => {
  try {
    const member = MemberDB.getOneMember(memberId);
    return member;
  } catch (error) {
    throw error;
  }
};

const createNewMember = (newMember) => {
  // Se parametriza el objeto newWorkout para que pueda agrepar los campos que faltan 
  const memberToInsert = {
      ...newMember,
      id: uuid(),
      /* createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }), */
    };

  try {
    const createdMember = MemberDB.createNewMember(memberToInsert);
    return createdMember;
  } catch (error) {
    throw error;
  }
};

const updateOneMember = (memberId, changes) => {
  try {
    const updatedMember = MemberDB.updateOneMember(memberId, changes);
    return updatedMember;
  } catch (error) {
    throw error;    
  }
};

const deleteOneMember = (memberId) => {
  try {
    const deletedMember = MemberDB.deleteOneMember(memberId);
    return deletedMember;
  } catch (error) {
    throw error;
  }
};

module.exports = { 
    getAllMembers, 
    getOneMember,
    createNewMember,
    updateOneMember,
    deleteOneMember
};