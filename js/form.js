 //下拉选择
 var selectDrop = function (input, droplist) {
   let iv = document.getElementById(input);
   let dl = document.getElementById(droplist);
   let a = iv.placeholder;
   iv.onfocus = function () {
     iv.placeholder = '';
     iv.classList.add("input-focus");
     dl.style.display = 'block';
   }
   iv.onblur = function () {
     iv.placeholder = a;
   }
   let list = dl.getElementsByTagName("li");
   for (i = 0; i < list.length; i++) {
     list[i].setAttribute("onclick", "fuzhi(this,'" + input + "','" + droplist + "')");
   }
 };
 var fuzhi = function (obj, input, droplist) {
   var iv = document.getElementById(input);
   var dl = document.getElementById(droplist);
   iv.value = obj.innerHTML;
   iv.classList.remove("input-focus");
   dl.style.display = 'none';
 }
 selectDrop("payMethod", "payMethodList");

 // ------------城市选择 --------------------
 var citySelect = function (SP, SC, Sc) {
   let selectP = document.getElementById(SP);
   let selectC = document.getElementById(SC);
   let selectc = document.getElementById(Sc);

   for (let i = 0; i < provice.length; i++) {
     let ii = i;
     var option = document.createElement("option");
     option.innerHTML = provice[i].name;
     selectP.appendChild(option);

     option.onclick = function () {
       let childs = selectC.children;
       for (let i = childs.length - 1; i > 0; i--) {
         selectC.removeChild(childs[i]);
       }

       let childss = selectc.children;
       for (let i = childss.length - 1; i > 0; i--) {
         selectc.removeChild(childss[i]);
       }

       for (m = 0; m < provice[ii].city.length; m++) {
         let mm = m;
         var option = document.createElement("option");
         option.innerHTML = provice[ii].city[m].name;
         selectC.appendChild(option);

         option.onclick = function () {
           let childss = selectc.children;
           for (let i = childss.length - 1; i > 0; i--) {
             selectc.removeChild(childss[i]);
           }

           for (n = 0; n < provice[ii].city[mm].county.length; n++) {
             var option = document.createElement("option");
             option.innerHTML = provice[ii].city[mm].county[n];
             selectc.appendChild(option);
           }
         }

       }
     }
   }
 }
 citySelect("senderProvice", "senderCity", "senderCounty");
 citySelect("receiverProvice", "receiverCity", "receiverCounty");

 //---------------------时间选择------------------------
 var d = new Date();
 var goDay = document.getElementById("goDay");
 var goDate = document.getElementById("goDate");
 var datelist = goDate.getElementsByTagName("li");
 var goTime = document.getElementById("goTime");
 var timelist = goTime.getElementsByTagName("li");

 //创建五天内日期列表  
 for (let i = 0; i < 5; i++) {
   let dy = d.getFullYear();
   let dm = d.getMonth() + 1;
   let dd = d.getDate() + i;
   let list = document.createElement("li");
   list.innerHTML = dy + "-" + dm + "-" + dd;
   goDate.appendChild(list);
   //当天时间超过的不可选
   if (i == 0 & d.getHours() >= 19) {
     goDate.removeChild(list);
   }
 }

 //点击输入框，打开日期表
 goDay.onfocus = function () {
   document.getElementById("godateList").style = "display:block";
   goDate.style = "display:block";
 }
 datelist[0].onclick = function () {
   if (d.getHours() > 9 & d.getHours() < 13) {
     timelist[0].style = "color:#555";
   } else if (d.getHours() > 13 & d.getHours() <
     16) {
     timelist[0].style = "color:#555";
     timelist[1].style = "color:#555";
   } else if (d.getHours() > 16 & d.getHours() <
     19) {
     timelist[0].style = "color:#555";
     timelist[1].style = "color:#555";
     timelist[2].style = "color:#555";
   }
   goTime.style = "display:block";
   for (let n = 0; n < 4; n++) {
     let time = timelist[n];
     if (time.style.color != "rgb(85, 85, 85)") {
       time.onclick = function () {
         goDay.value = datelist[0].innerHTML + "  " + time.innerHTML;
         goTime.style = "display:none";
         goDate.style = "display:none";
         document.getElementById("godateList").style = "display:none";
       }
     }
   }
 }

 for (let i = 1; i < datelist.length; i++) {
   datelist[i].onclick = function () {
     goTime.style = "display:block";
     let date = datelist[i];
     for (let n = 0; n < 4; n++) {
       let time = timelist[n];
       time.style = "color:#000";
       time.onclick = function () {
         goDay.value = datelist[i].innerHTML + "  " + time.innerHTML;
         goTime.style = "display:none";
         goDate.style = "display:none";
         document.getElementById("godateList").style = "display:none";
       }
     }
   }
 }


// ---------form表单请求------------
 var order;
 Mock.mock('http://test.com', function (options) {
   var mockdata = JSON.parse(options.body);
   return mockdata;
 });
 $("#submitbtn").click(function () {
  let requiredInput=document.getElementsByTagName("input");
  for(let i=0;i < requiredInput.length;i++){
    if(requiredInput[i].required==true){
      if(requiredInput[i].value==""){
        alert("请填写必填项");
        return 0;
      }
    }
  }
   let formArray = $("#order").serializeArray();
   let obj = {};
   for (var i in formArray) {
     obj[formArray[i].name] = formArray[i]['value'];
   }
   $.ajax({
     url: "http://test.com",
     type: "post",
     dataType: "json",
     data: JSON.stringify(obj),
   }).done(function (data, status, xhr) {
     if (status == "success") {
       order = data;
       console.log(order);
       alert("提交成功（控制台查看数据）")
     } else {
       alert("提交失败");
     }
   });
 });

//---------------总计--------------
function weightChange(weight){
 console.log(weight);
 if(weight<=1){
   document.getElementById("total").innerHTML=12;
 }
 else if(weight>1 & weight<20){
  document.getElementById("total").innerHTML=5*(weight-1)+12;
 }
 else {
   alert("超重");
 }
}


// var bbb=document.getElementsByTagName("input")
// for(let i=0;i<9;i++){
// if(bbb[i].required==true){
//   if(bbb[i].value==null){
//     alert("请填写必填项")
//   }
// }
// }

// if(document.getElementsByTagName("input")){}