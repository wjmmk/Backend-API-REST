
// Import the Member - Service
const memberService = require("../services/memberService");


  const getAllMembers = (req, res) => {
    try {
      const AllMembers = memberService.getAllMembers();
      res.send({status: 'OK', data: AllMembers, message: 'All members retrieved'});
    } catch (error) {
      res.status(error.status || 500)
         .send({status: 'FAILED', data: { error: error.message || error }, message: 'Error getting members'});
    }
  };
  
  const getOneMember = (req, res) => {
    const { params: {memberId} } = req;
    if (!memberId) {
        res.status(400)
           .send({
              status: 'FAILED',
              data: { error: "Parameter ': memberId' can not be empty" },
              message: 'Missing parameters'
        });
    }

    try {
      const member = memberService.getOneMember(memberId);
      res.send({status: 'OK', data: member, message: 'Member retrieved'});
    } catch (error) {
      res.status(error.status || 500)
         .send({status: 'FAILED', data: { error: error.message || error }, message: 'Error getting member'});
    }
  };
  
  const createNewMember = (req, res) => {
    const {body} = req;
    if( !body.name ||
        !body.gender ||
        !body.dateOfBirth ||
        !body.email ||
        !body.password ){
            res.status(400).send({
              status: 'FAILED', 
              data: { error:
                 "One of the following keys is missing or is empty in request body: 'name', 'gender', 'dateOfBirth', 'email', 'password'",
              }, 
              message: 'Missing parameters'});
            return;
        }

    const newMember = {
        workout: body.name,
        record: body.gender,
        date: body.dateOfBirth,
        weight: body.email,
        height: body.password
    }
  
    try {
      const createdMember = memberService.createNewMember(newMember);
      res.status(201).send({status: 'OK', data: createdMember, message: 'Member created'});
    } catch (error) {
      res.status(error.status || 500)
         .send({status: 'FAILED', data: { error: error.message || error }, message: 'Error creating member'});
    }
  };
  
  const updateOneMember = (req, res) => {
    const { 
        body,
        params: {memberId}
    } = req;

    if(!memberId){
       res.status(400)
       .send({
           status: 'FAILED', 
           data: { error: "Parameter ':memberId' can not be empty" },
           message: 'Missing parameters'
       });
    }
    
    try {
      const updatedMember = memberService.updateOneMember(memberId, body);
      res.send({status: 'OK', data: updatedMember, message: 'Member updated'});
    } catch (error) {
      res.status(error.status || 500)
         .send({status: 'FAILED', data: { error: error.message || error }, message: 'Error updating member'});
    }
  };
  
  const deleteOneMember = (req, res) => {
    const { params: {memberId} } = req;

    if(!memberId){return res.send({status: 'ERROR', data: null, message: 'member does not exist.'});}
    
    try {
      const deleteMember = memberService.deleteOneMember(memberId);
      res.status(204).send({status: 'DELETED', data: deleteMember, message: 'Record deleted'});
    } catch (error) {
      res.status(error.status || 500)
         .send({status: 'FAILED', data: { error: error.message || error }, message: 'Error deleting member'});
    } 
  };
  
  module.exports = {
    getAllMembers,
    getOneMember,
    createNewMember,
    updateOneMember,
    deleteOneMember,
  };