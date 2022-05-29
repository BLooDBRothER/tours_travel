function User(){
    let isLogin=false;
    let email=null;
    let name=null;
    let password=null;
    let id=null;
    let pincode=null;
    let area=null;
    let phone_num=null;
    function setLogin(data){
        isLogin=data;
    }
    function initializer(){
        isLogin=false;
        email=null;
        name=null;
        password=null;
        id=null;
        pincode=null;
        area=null;
        phone_num=null;
        const floatForm = document.querySelectorAll('.float-form-container');
        floatForm[1].querySelector(".name").value="";
        floatForm[1].querySelector(".mobile").value="";
        floatForm[1].querySelector(".email").value="";
    }
    function setData(mail,nam,pass,ide,pin,are,ph_num){
        email=mail;
        name=nam;
        password=pass;
        id=ide;
        pincode=pin;
        area=are;
        phone_num=ph_num;
    }
    function printAllData(){
        console.log({
            id,name,email,password,pincode,area,phone_num
        });
    }
    function returnAllData(){
        return{
            id,
            name,
            email,
            password,
            pincode,
            area,
            phone_num,
            isLogin
        }
    }
    return {
        isLogin,
        initializer,
        setData,
        printAllData,
        returnAllData,
        setLogin
    }
}

export const user=User();