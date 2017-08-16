const {Pool} = require('pg');


const env = require('env2');
env('./config.env');

if (!process.env.DB_URL) {
  throw new Error('Environment variable DB_URL must be set');
}




module.exports = new Pool({connectionString: });
