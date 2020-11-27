const Sequelize = require('sequelize');
const db = require('./db');

const Session = db.define('session', {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
});

module.exports = Session;
