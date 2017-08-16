const dbConnection = require('../database/db_connection.js');


const postData = (name, content, cb) => {
    dbConnection.query('INSERT INTO users (name) VALUES ($1)', [name], (err, res) => {
        if (err) {
            return cb(err);
        } else {
            cb(null, res);
        }
    })
    dbConnection.query('INSERT INTO scg (content) VALUES ($1)', [content], (err, res) => {
        if (err) {
            return cb(err);
        } else {
            cb(null, res);
        }
    })
}

module.exports = postData;
