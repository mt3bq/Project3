const express =require('express');
const mysql= require('mysql');
const connect=require('./db');
const app=express();

app.use(express.urlencoded ({ extended: false }));
app.use(express.json());

app.set('view engine','ejs');
app.use(express.static('public'))


app.get('/',(req,res)=>{


    res.render('index',{title:" بحث"});
})


app.post('/add_new_student',(req,res,next)=>{

    let full_name=req.body.Full_name;
    let email=req.body.Email;
    let phone_number=req.body.Phone_number;
    let persnal_id=req.body.Persnal_id;
    let step=req.body.Step;
  
    let sql='select * from students where email ="'+email+'"';

    connect.query(sql,(err,rel)=>{
        
        if(!err){
            if(rel.length===0){
                let insert='insert into students (full_name,email,phone_number,step,persnal_id)value("'+full_name+'","'+email+'","'+phone_number+'","'+step+'","'+persnal_id+'")';
                connect.query(insert,(e)=>{
                    if(!e){
                        res.render('index');
                    }

                })

            }else{ 
                
                console.log("Exsesst");
                res.render('Add-new-student-e');
                    next();
                }

        }
        else{
            console.log("dddddddrel"+ err)
            
            
        }

    })


})
app.get('/add_new_student',(req,res)=>{


    res.render('add_new_student');


})

app.post('/add_matter',(req,res,next)=>{
    let matter_name=req.body.Matter_name;
    let matter_code=req.body.Matter_code;
    let teher_name=req.body.Teher_name;

    let sql='select * from matter where matter_name="'+matter_name+'" and matter_code= "'+matter_code+'"';

    connect.query(sql,(e,r)=>{
        if(!e){
            if(r.length===0){

                let inset_query='insert into matter (matter_name,matter_code,Teher_name)values("'+matter_name+'","'+matter_code+'","'+teher_name+'")';
                connect.query(inset_query,(err)=>{
                    if(!err){
                        res.render('index');
                        
                    }
                    else{
                        res.send("Filed");
                        
                    }
                })


            }else{
                res.render('add_matter');
                
            }
        }
    })
})


app.get('/Add_matter',(req,res)=>{


    res.render('add_matter',{title:"اضافة مادة"});
})



app.get('/add_teher',(req,res)=>{

    


    res.render('add_teher', {title:"اضافة معلم"});
})
//show_all Student
app.get('/show_all',(req,res)=>{

    var sql='SELECT * FROM students';
    connect.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('show_all', { user: data});
  });
})

app.get('/del:id',(req,res)=>{
    let id=req.params.id;
    let del='DELETE FROM students WHERE id="'+id+'"';
    connect.query(del,(e)=>{
        if(e){
            console.log(e);
        }
        else{
            
            res.redirect('show_all');
        }
    })
    
})

app.get('*',(req,res)=>{

    res.render('404');
})






app.listen(3000,()=>{
console.log("Server is Working...");
})