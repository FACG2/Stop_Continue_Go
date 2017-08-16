// write query for type = stop
const dbConnection = require('../database/db_connection.js');
const getDataStop = (cb) => {
  dbConnection.query(`select users.name , scg.content from users INNER JOIN scg
    on users.id = scg.user_id
    where scg.type = 'stop'`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};
// write query for type = continue
const getDataCont = (cb) => {
  dbConnection.query(`select users.name , scg.content from users INNER JOIN scg
    on users.id = scg.user_id
    where scg.type = 'continue'`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

// write query for type = go
const getDataGO = (cb) => {
  dbConnection.query(`select users.name , scg.content from users INNER JOIN scg
    on users.id = scg.user_id
    where scg.type = 'go'`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = {
  getDataStop: getDataStop,
  getDataCont: getDataCont,
  getDataGO: getDataGO
};
