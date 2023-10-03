const Pool = require('pg').Pool;;
const pool = new Pool({
   database:"projectuserauth",
   user:"postgres",
   password:"",
   host:"localhost",
   port:5432
});

module.exports = pool;
