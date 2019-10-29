
const handler = module.exports = {};

/**
 * 
 * @param {object} options
 * @param {object} options.message
 * @param {object} options.message.payload.participant
 * @param {string} options.message.payload.participant.id - Id of the participant.
 * @param {string} options.message.payload.participant.fullName
 */
handler.onParticipantAdded = async ({message}) => {
  // Implement your business logic here...
};
