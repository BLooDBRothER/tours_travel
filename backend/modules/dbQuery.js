const connection = require("./dbConnection");

function dbFunctions(){
    connection.connect();
    function query(query,cb){
        connection.query(`${query}`,(error,row,field)=>{
            cb({error,row,field});
        });
    }
    return {query}
}

const db=dbFunctions();
module.exports=db;