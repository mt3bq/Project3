var mysql = require('mysql');
var Matter_name=document.getElementById("Matter_name");
let Code_Matter=document.getElementById("Code_Matter");
let Teher_name=document.getElementById("Teher_name");
let save_mat=document.getElementById("save_mat");



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0553110732",
  database: "student"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO `mater` (`name_matter`, `code`,`teher`) VALUES ('"+Matter_name.value+"','"+ Code_Matter.value+"','"+ Teher_name.value+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});


let matter=[];

save_mat.onclick =function(){

    let Add_Matter={

        mat_name:Matter_name.value,
        code_ma:Code_Matter.value,
        teh_na:Teher_name.value,
    }

    matter.push(Add_Matter);
    console.log(matter);
}

