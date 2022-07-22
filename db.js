const mysql=require('mysql');

const connect=mysql.createConnection(
    {

        
        host:"localhost",
        user:"root",
        password:"123456789",
        database:"mt3b"
    }



);

connect.connect((err)=>{
    if(!err){
        console.log("Connect secssful...");
    }else{
        console.log(err)
    }
})

module.exports=connect;