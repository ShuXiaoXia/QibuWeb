var notice=document.getElementById("notice")

//**********判断名字**********
function isName(str){
    let reg = new RegExp(/^[\u4e00-\u9fa5]{2,4}$/);
    let result = reg.test(str);
    if(result==false){
      alert("填写正确名字")
    }
}
//**********判断手机**********
function isTel(str) {
    let reg = new RegExp(/^\d{11}$/g);
    let result = reg.test(str);
    if(result==false){
        alert("填写正确手机号码")
      }
}
//**********判断邮箱**********
function isEmail(str){
    let reg = new RegExp(/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/);
    let result = reg.test(str);
    if(result==false){
        alert("填写正确邮箱")
      }
}
//**********判断密码**********
function isPassword(str){
    let reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/);
    let result = reg.test(str);
    console.log(result);
    if(result==false){
        alert("密码格式错误")
      }
}

