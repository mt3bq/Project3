//Add_New_Student
let First_name=document.getElementById("first_name");
let mid_name=document.getElementById("mid_name");
let List_name=document.getElementById("List_name");
let id=document.getElementById("id");
let Email=document.getElementById("email");
let Phone_Number=document.getElementById("phone_number");
let step_learn=document.getElementById("step_learn");
let bbtn=document.getElementById('bttt');




//Add_New_Student

let Student=[];




bbtn.onclick = function(){

    let new_student={
        f_name:First_name.value,
        m_name:mid_name.value,
        li_name:List_name.value,
        idd:id.value,
        email:Email.value,
        phone:Phone_Number.value,
        step:step_learn.value,
 
    }

 Student.push(new_student);

console.log(Student);
}
















