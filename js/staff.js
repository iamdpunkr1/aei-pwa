auth.onAuthStateChanged(user => {
    if(user){
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            if(user.admin){
            //    console.log("user is an admin");
                setUI(user);
              }
          });
//        console.log('Inside STAFF.js');
                    //Staff Logout 
                    const slogout = document.getElementById('slogout');
                    slogout.addEventListener('click',(e) => {
                            e.preventDefault(); 
                           // console.log("inside signing out");
                        auth.signOut().then(() => {
                            window.open("/index.html","_self");
                        //    console.log('after window logout');
                        });
                    }); 
            }else{
                window.location.replace("/index.html");
                setUI([]);
            }
   });
//clock
const deg = 6;
const hr = document.querySelector('#hr');
const mn = document.querySelector('#mn');
const sc = document.querySelector('#sc');
setInterval(()=>{
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;
    hr.style.transform = `rotateZ(${hh+(mm/12)}deg)`;
    mn.style.transform= `rotateZ(${mm}deg)`;
    sc.style.transform= `rotateZ(${ss}deg)`;
});
   //set faculty details function
const setUI = user => {
    var todays = new Date();
    var day = todays.getDay();
    var daylist = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var dd = String(todays.getDate()).padStart(2, '0');
    var yd = String(todays.getDate()-1).padStart(2, '0');
    var td = String(todays.getDate()+1).padStart(2, '0');
    var mm = String(todays.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = todays.getFullYear();
    toda = dd + '-' + mm  + '-' + yyyy;
    yoda = yd + '-' + mm + '-' + yyyy;
    tomo = td + '-' + mm + '-' + yyyy;
 //   console.log('today:' +toda);
   // console.log('Yesday:' +yoda);
   // console.log('tomo:' +tomo);
    const name= document.querySelector('.name');
    const dept= document.querySelector('.dept');
    const today= document.querySelector('.today');
    const yesterday= document.querySelector('.yesterday');
    const tom= document.querySelector('#tomorrow');
    const tatd = document.querySelectorAll('.tatd');
    let a=0;
    let b=0;
//seting Take Attendence
const takeAttendence = (voc,dy,doc) => {
var total=0;
const div=`            
<button class="btn pink waves-effect waves-light sidenav-close" href="#!">CLOSE</button>
<div class="container">
<div class="card-panel center">
   <h4><strong>Take Attendence</strong></h4>
   <h6>${voc.data().time} | ${dy}</h6>
   <h6>${voc.data().subject} | ${voc.data().branch}.Engg </h6>
   <h6> Room No: ${voc.data().room} | ${voc.data().sem}th SEM </h6>
   <h6>Total Students:&nbsp;<span id="total"><span/></h6>
   </div>
   <form id="${b}" class="frm${b}">
   <div class="students${a}"></div>
   <div class="input-field white">
   <textarea name="topic" id="textarea1" class="materialize-textarea " style="height: 100px; border: 1px solid black; border-radius: 5px;" required></textarea>
   <label for="textarea1">Today's Topic</label>
   </div>
   <div class="center">
   <button class="btn indigo left-align waves-effect waves-light">&nbsp; SUBMIT &nbsp;</button>
   &nbsp;&nbsp;&nbsp; 
   <input type="reset" class="btn pink left-align waves-effect waves-light">
   </form>
  </div>
 </br>
</div>`;
tatd[a].innerHTML=div;
tatd[a].setAttribute('id',voc.id);
//setting students
const stud = document.querySelector('.students'+b);
//console.log(stud);
db.collection('student').where('branch','==',voc.data().branch).where('sem','==',voc.data().sem).onSnapshot((eoc) => {
eoc.forEach((foc)=>{
  const html =`    
  <div class="card-panel stud-atd" id="${foc.id}">
   <strong>${foc.data().name}</strong>  
   <span>  ${foc.data().rollNo} </span>
    <label class="right">
      <input type="checkbox" id="${foc.data().rollNo}" name="attend" value="${foc.id}"/>
      <span></span>
    </label>
   </div>`;
   stud.innerHTML+=html;
   total++;
   document.getElementById('total').textContent=total;
}) 
});  
let c=0;
a++;
const form = document.querySelector('.frm'+b);
const array = [];
form.addEventListener('submit',(e)=>{
   e.preventDefault();
   const rollNo= form.elements.attend; 
   const topic=form.elements.topic.value;
   for(i=0;i<rollNo.length;i++){
    const change = db.collection('student').doc(rollNo[i].value);
     if(rollNo[i].checked){
      array.push(rollNo[i].id)
      change.get().then(student=>{
        for(var j in student.data().subjects){
          if(voc.data().subject==j && j=='Software Engineering'){
            change.update({                
              "subjects.Software Engineering.attended": firebase.firestore.FieldValue.increment(1),
              "subjects.Software Engineering.total": firebase.firestore.FieldValue.increment(1)
             })
          }
          if(voc.data().subject==j && j=='Cryptography & Network Security'){
            change.update({                
              "subjects.Cryptography & Network Security.attended": firebase.firestore.FieldValue.increment(1),
              "subjects.Cryptography & Network Security.total": firebase.firestore.FieldValue.increment(1)
             })
          }
          if(voc.data().subject==j && j=='Artificial Intelligence'){
            change.update({                
              "subjects.Artificial Intelligence.attended": firebase.firestore.FieldValue.increment(1),
              "subjects.Artificial Intelligence.total": firebase.firestore.FieldValue.increment(1)
             })
          }
          if(voc.data().subject==j && j=='Mobile Computing'){
            change.update({                
              "subjects.Mobile Computing.attended": firebase.firestore.FieldValue.increment(1),
              "subjects.Mobile Computing.total": firebase.firestore.FieldValue.increment(1)
             })
          }
          if(voc.data().subject==j && j=='Professional Practice-VI'){
            change.update({                
              "subjects.Professional Practice-VI.attended": firebase.firestore.FieldValue.increment(1),
              "subjects.Professional Practice-VI.total": firebase.firestore.FieldValue.increment(1)
             })
          }
        }
      })
     }else{
      change.get().then(student=>{
        for(var j in student.data().subjects){
          if(voc.data().subject==j && j=='Software Engineering'){
            change.update({                
                           "subjects.Software Engineering.total": firebase.firestore.FieldValue.increment(1)
             })
          }
          if(voc.data().subject==j && j=='Cryptography & Network Security'){
            change.update({                 
              "subjects.Cryptography & Network Security.total": firebase.firestore.FieldValue.increment(1)
             })
          }
          if(voc.data().subject==j && j=='Artificial Intelligence'){
            change.update({                           
              "subjects.Artificial Intelligence.total": firebase.firestore.FieldValue.increment(1)
             })
          }
          if(voc.data().subject==j && j=='Mobile Computing'){
            change.update({                
              "subjects.Mobile Computing.total": firebase.firestore.FieldValue.increment(1)
             })
          }
          if(voc.data().subject==j && j=='Professional Practice-VI'){
            change.update({                 
              "subjects.Professional Practice-VI.total": firebase.firestore.FieldValue.increment(1)
             })
          }
        }
      })
     }
  }
  db.collection('attendence').add({
     branch: voc.data().branch,
     subject:voc.data().subject,
     date:dy,
     time:voc.data().time,
     students:[...array],
     fid:doc.data().fid,
     sem: voc.data().sem,
     serial: c,
     topic: topic
   })
   array.length=0;
   var toastHTML = '<span class="center align-center">Successful</span>';
   M.toast({html: toastHTML});
//Closing the form after giving the attendence
 const menu =  document.querySelectorAll('.tatd'); 
 menu.forEach(each=>{
  M.Sidenav.getInstance(each).close();
 })
}) 
b++;
c++;
} 
//Setting Routine
const setAtd= (voc,dy,date,doc)=>{
      let z= Math.random();
      const html = `
      <div class="card-panel period">
       <p><strong>${voc.data().day}</strong> </p>
       <h4 ><strong>Period - ${voc.data().period}</strong></h4>
       <h6>Time: ${voc.data().time}</h6>
       <h5>${voc.data().subject}</h5>
       <h6>${voc.data().branch} Engg / ${voc.data().sem} SEM  </h6>
       <br>
       <span id="${z}">
       <button class="btn-small indigo left-align waves-effect waves-light flow-text sidenav-trigger"  data-target="${voc.id}" >TAKE ATTENDENCE</button>
       <button  class="btn-small pink left-align waves-effect waves-light flow-text" onclick="cancel('${voc.data().subject}','${date}','${voc.data().sem}','${voc.data().branch}','${doc.data().fid}')">CANCEL</button>
       </span>
       </div>`;
     dy.innerHTML+=html;
     //To remove the buttons after taking attendence
    db.collection('attendence').onSnapshot(snaps=>{
      snaps.forEach(each=>{
        if(voc.data().subject==each.data().subject && date==each.data().date){
            //  console.log('From fb date',each.data().date,'subejct',each.data().subject)                   
                      const tomButtons= document.getElementById(z);
                      tomButtons.classList.add("mystyle");
                    //  console.log('if= ',tomButtons)
        }
      })
    })
 }
//settting Faculty Name
    db.collection('faculty').doc(user.uid).onSnapshot(doc => {
          const html = ` <span class="white-text ">${doc.data().name}</span>`;
          name.innerHTML= html;
          dept.textContent=doc.data().dept + " Department";
  //setting Faculty Routine          
    db.collection('routine').where('teacher','==',doc.data().fid).orderBy('period').onSnapshot((coc) => {
        coc.forEach((voc)=>{
            //Today's Routine
             if(voc.data().day == daylist[day]){                 
                 setAtd(voc,today,toda,doc);    
                 takeAttendence(voc,toda,doc);            
             } 
             //Tommorow routine
            if(voc.data().day == daylist[day+1]){
              setAtd(voc,tom,tomo,doc); 
              }           
            //Yesterday routine
            if(voc.data().day == daylist[day-1]){
               setAtd(voc,yesterday,yoda,doc);
               takeAttendence(voc,yoda,doc);
            }
          });
         });
        });
        //setting time and date
        var hour = todays.getHours();
        var minute = todays.getMinutes();
        var second = todays.getSeconds();
        var prepand = (hour >= 12)? " PM ":" AM ";
        hour = (hour >= 12)? hour - 12: hour;
        if (hour===0 && prepand===' PM ') 
        { 
        if (minute===0 && second===0)
        { 
        hour=12;
        prepand=' Noon';
        } 
        else
        { 
        hour=12;
        prepand=' PM';
        } 
        } 
        if (hour===0 && prepand===' AM ') 
        { 
        if (minute===0 && second===0)
        { 
         hour=12;
         prepand=' Midnight';
        } 
        else
        { 
         hour=12;
         prepand=' AM';
        } 
        } 

    //  console.log("Current Time : "+hour + prepand + " : " + minute + " : " + second);
  }
//cancel class
const cancel = (subject,date,sem,branch,fid)=>{
 // console.log('Cancel Working',date);
  var toastHTML = '<span class="center align-center">Cancelled</span>';
  M.toast({html: toastHTML});
  db.collection('attendence').add({
    branch: branch,
    subject:subject,
    date:date,
    students:[],
    fid:fid,
    sem: sem,
    status: "cancelled"
  })  
 // console.log('Done I guess');   
}
