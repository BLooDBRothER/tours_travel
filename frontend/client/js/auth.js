import { api } from "../../api.js";
import { user } from "./userData.js";

let reg_form=document.querySelector(".sign-up");
let login_form=document.querySelector(".login");

reg_form.querySelector("#reg-email").addEventListener("change",async(e)=>{
    const value=e.target.value;
    const data={
        "email":value
    }
    let d=await api.post_json("user/isReg",JSON.stringify(data));
    if(d.status===true){
        e.target.value=null;
        reg_form.querySelector("#reg-email").classList.add("box-red");
    }
    else{
        reg_form.querySelector("#reg-email").classList.remove("box-red");
    }
});

reg_form.querySelector("#reg-re-password").addEventListener("change",(e)=>{
    if(reg_form.querySelector("#reg-password").value!==e.target.value){
        e.target.value=null;
        e.target.classList.add("box-red");
    }
    else{
        e.target.classList.remove("box-red");
    }
})


reg_form.addEventListener("submit",async (e)=>{
    e.preventDefault();
    let data={};
    data.email=reg_form.querySelector("#reg-email").value;
    data.password=reg_form.querySelector("#reg-password").value;
    data.name=reg_form.querySelector("#name").value;
    data.phone_num=+reg_form.querySelector("#mobile").value;
    data.pincode=+reg_form.querySelector("#pincode").value;
    data.area=reg_form.querySelector("#area").value;
    console.log(data);
    reg_form.reset();
    let d=await api.post_json("user",JSON.stringify(data));
    console.log(d);
});

login_form.addEventListener("submit",async (e)=>{
    e.preventDefault();
    let data={};
    data.email=login_form.querySelector("#email").value;
    data.password=login_form.querySelector("#password").value;
    let d=await api.post_json("user/login",JSON.stringify(data));
    console.log(d);
    login_form.reset();
    if(d.length===0){
        alert("Wrong Credentials");
    }
    else{
        d=d[0];
        user.setLogin(true);
        user.setData(d.email,d.name,d.password,d.id,d.pincode,d.area,d.phone_num);
        user.printAllData();
        document.querySelector("#login-btn").classList.add("none");
        document.querySelector("#logout-btn").classList.remove("none");
    }
});

document.querySelector("#logout-btn").addEventListener("click",(e)=>{
    user.initializer();
    document.querySelector("#login-btn").classList.remove("none");
    document.querySelector("#logout-btn").classList.add("none");
})