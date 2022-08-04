const express =require('express');
const mysql= require('mysql');
const connect=require('./db');
const session= require('express-session');
const MySQLStore = require("express-mysql-session")(session);
const app=express();

app.use(express.urlencoded ({ extended: false }));
app.use(express.json());


app.set('view engine','ejs');
app.use(express.static('public'))



//start session middleware
const sessionConnrct=connect;
const sessionStore= new MySQLStore({
  expiration: 10800000,
  createDatabaseTable: true,
  schema:{
    tableName: 'session',
    columnNames:{
        session_id: 'sesssion_id',
        expires: 'expires',
        data: 'data'
    }
  }
},sessionConnrct)


app.use( session({
  key: 'keyin',
  secret: 'my secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: true
}))


const cheek=(req,res,next)=>{
    if(req.session.cheek){
        next();
    }else{
        res.redirect('login');
    }
}



//end session-mysql

app.get('/login',(req,res)=>{
    res.render('login',{name_eror:''});
})
app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    let sql='select * from admin where email="'+email+'" and password="'+password+'"';

    connect.query(sql,(e,r)=>{
        if(!e){
           if(r.length===0){
               res.render('login',{name_eror:'خطا في بيانات الدخول'})
           }else{
            req.session.cheek=true;
            res.render("index")
           }
        }else{
            console.log(e);
        }
    })
})
app.get('/logout', function(req,res){
    req.session.destroy(function(err){
        if(!err){
            res.redirect('login');
        }
    })
  })



app.get('/index',cheek,(req,res)=>{
    
    res.render('index');

    
})




app.get('/add_new_student',cheek,(req,res)=>{
    

    res.render('add_new_student',{t_name:'اضافة',name_e:''});

})

app.post('/add_new_student',async(req,res,next)=>{

   
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
                connect.query(insert,(e,rell)=>{
                    if(!e){
                        res.render('Add_new_student',{t_name:"اضافة طالب ",name_e:'تم التسجيل بنجاح'});
                    }

                })

            }else{ 
                
                
                res.render('Add_new_student',{t_name:"اضافة طالب ",name_e:'المستخدم مسجل'});
                   
                }

        }
        else{
            console.log( err)
            
            
        }

    })


})

//Add mather Method  
app.get('/add_matter',cheek,(req,res)=>{
    
   
        res.render('add_matter',{title:'اضافة مادة',name_eror:''});
 
    
  
})








app.post('/add_matter',(req,res,next)=>{
    let matter_name=req.body.Matter_name;
    let matter_code=req.body.Matter_code;
    let teher_name=req.body.Teher_name;

    let sql='select * from matter where matter_name="'+matter_name+'"';
    
    connect.query(sql,(er,resl)=>{
       
       
        if(!er){
           
            let inset_query='insert into matter (matter_name,matter_code,Teher_name)values("'+matter_name+'","'+matter_code+'","'+teher_name+'")';
            if(resl.length===0){
                connect.query(inset_query,(e)=>{
                    if(!e){
                        res.render('add_matter',{title:'اضافة مادة',name_eror:'تم اضافة المادة'});
                    }else{
                        console.log(e);
                    }
                })
            }
        }else{
            connect.log(er)
        }


    })
})






app.get('/add_teher',cheek,(req,res)=>{

  
        res.render('add_teher', {title:"اضافة معلم",name_eror:''});
   

    

    
})
app.post('/add_teher',(req,res,next)=>{


    let teher={
        name:req.body.Full_name,
        persnal_id:req.body.Persanl_id,
        email:req.body.Email,
        phone:req.body.Phone_number,
        major:req.body.Majore
    };

    let sql='select * from teacher where pesnal_id = "'+teher.persnal_id+'" and email = "'+teher.email+'" and phone_number ="'+teher.phone+'"';
    
    connect.query(sql,(er,re)=>{
        if(!er){
            if(re.length===0){
                let insert='insert into teacher(name,pesnal_id,email,phone_number,Spec)values("'+teher.name+'","'+teher.persnal_id+'","'+teher.email+'","'+teher.phone+'","'+teher.major+'")';
                connect.query(insert,(e,r)=>{
                    if(!e){
                        res.render('add_teher',{title:"اضافة معلم",name_eror:'تم التسجيل بنجاح'});
                    }else{
                        console.log(e);

                    }
                })
            }else{
                res.render('add_teher',{title:"اضافة معلم",name_eror:'المعلم مسجل مسبقا'});

            }
        }
        
        
        
        else{
            console.log(er);
        }
    })

})


//show_all Student
app.get('/show_all',cheek,(req,res)=>{

   
    var sql='SELECT * FROM students;';
    connect.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('show_all', { title:'عرض الكل',user: data});
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