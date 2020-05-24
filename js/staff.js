const db = firebase.firestore();
auth.onAuthStateChanged(user => {
    if(user){
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            if(user.admin){
                console.log("user is an admin");
                setUI(user);
              }
          });
        console.log('Inside STAFF.js', user);
                    //Staff Logout 
                    const slogout = document.querySelector('.slogout');
                    slogout.addEventListener('click',(e) => {
                            e.preventDefault(); 
                            console.log("inside signing out");
                        auth.signOut().then(() => {
                            window.open("index.html","_self");
                            console.log('after window logout');
                        });
                    }); 
            }else{
                window.location.replace("index.html");
            }
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
    console.log('today:' +toda);
    console.log('Yesday:' +yoda);
    console.log('tomo:' +tomo);


    const name= document.querySelector('.name');
    const dept= document.querySelector('.dept');
    const today= document.querySelector('.today');
    const yesterday= document.querySelector('.yesterday');
    const tom= document.querySelector('#tomorrow');
    const tatd = document.querySelectorAll('.tatd');
    let a=0;



    db.collection('faculty').doc(user.uid).get().then(doc => {
          const html = ` <span class="white-text ">${doc.data().name}</span>`;
          name.innerHTML= html;
          dept.textContent=doc.data().dept + " Department";



          
    db.collection('routine').where('teacher','==',doc.data().fid).orderBy('period').get().then((coc) => {
        coc.forEach((voc)=>{


            //Today's Routine
             if(voc.data().day == daylist[day]){

                  const html = `
                    <div class="card-panel">
                     <p><strong>${voc.data().day}</strong> </p>
                     <h4 ><strong>Period - ${voc.data().period}</strong></h4>
                     <h6>Time: ${voc.data().time}</h6>
                     <h5>${voc.data().subject}</h5>
                     <h6>${voc.data().branch} Engg / ${voc.data().sem} SEM  </h6>
                     <br>
                     <button class="btn-small indigo left-align waves-effect waves-lighten-2 flow-text sidenav-trigger"  data-target="${voc.id}" >TAKE ATTENDENCE</button>
                     <button data-target="#" class="btn-small pink left-align waves-effect waves-lighten-2 sidenav-trigger flow-text">CANCEL</button>
                    </div>`;
                  today.innerHTML+=html;

                  const div=`            
                  <button class="btn pink waves-effect waves-lighten-2 sidenav-close" href="#!">CLOSE</button>
                  <div class="container">
                  <div class="card-panel center">
                     <h4><strong>Today's Attendence</strong></h4>
                     <h6>${voc.data().time} | ${toda}</h6>
                     <h6>${voc.data().subject} | ${voc.data().branch}.Engg </h6>
                     <h6> Room No: ${voc.data().room} | ${voc.data().sem}th SEM </h6>
                     <h6>Total Students: ${a}</h6>
                     </div>
                     <div class="students${a}"></div>
                     <div class="input-field white">
                     <textarea id="textarea1" class="materialize-textarea " style="height: 100px; border: 1px solid black; border-radius: 5px;"></textarea>
                     <label for="textarea1">Today's Topic</label>
                     </div>
                     <div class="center">
                     <a href="" class="btn indigo left-align waves-effect waves-lighten-2">&nbsp; SUBMIT &nbsp;</a>
                     &nbsp;&nbsp;&nbsp; 
                     <a href="#modal1" class="btn pink left-align waves-effect waves-lighten-2 modal-trigger">&nbsp; RESET &nbsp;</a>
                   </div>
                   </br>
                  </div>`;
               
                  tatd[a].innerHTML=div;
                  tatd[a].setAttribute('id',voc.id);
                  //setting students
                  const stud = document.querySelector('.students'+a);
                  console.log(stud);
                 db.collection('student').where('branch','==',voc.data().branch).where('sem','==',voc.data().sem).get().then((eoc) => {
                  eoc.forEach((foc)=>{
                    const html =`    
                    <div class="card-panel stud-atd" id="${foc.id}">
                    <strong>${foc.data().name}</strong>  
                     <span>  ${foc.data().rollNo}  </span>
                      <label class="right">
                        <input type="checkbox" />
                        <span></span>
                      </label>
                     </div>`;
                     stud.innerHTML+=html;
                  }) 
                });
                 
                  a++;
                  console.log(voc.id);




                 
             }


          
             //Tommorow routine
            if(voc.data().day == daylist[day+1]){

                const html = `
                <div class="card-panel ">
                  <p><strong>${voc.data().day}</strong> </p>
                  <h4 ><strong>Period - ${voc.data().period}</strong></h4>
                  <h6>Time: ${voc.data().time}</h6>
                  <h5>${voc.data().subject}</h5>
                  <h6>${voc.data().branch} Engg / ${voc.data().sem} SEM </h6>
                   <br>
                  <a class="btn-small pink left-align waves-effect waves-lighten-2 flow-text" href="/takeattendence.html" >CANCEL</a>
                  </div>`;
                tom.innerHTML+=html;

              }
           
            //Yesterday routine
            if(voc.data().day == daylist[day-1]){

                const html = `
                <div class="card-panel ">
                  <p><strong>${voc.data().day}</strong> </p>
                  <h4 ><strong>Period - ${voc.data().period}</strong></h4>
                  <h6>Time: ${voc.data().time}</h6>
                  <h5>${voc.data().subject}</h5>
                  <h6>${voc.data().branch} Engg / ${voc.data().sem} SEM </h6>
                   <br>
                  <button class="btn-small indigo left-align waves-effect waves-lighten-2 flow-text sidenav-trigger" data-target="${voc.id}" >EDIT ATTENDENCE</button>
                  </div>`;
                yesterday.innerHTML+=html;

                const div=`            
                <button class="btn pink waves-effect waves-lighten-2 sidenav-close" href="#!">CLOSE</button>
                <div class="container">
                <div class="card-panel center">
                   <h4><strong>Yesterday's Attendence</strong></h4>
                   <h6>${voc.data().time} | ${yoda}</h6>
                   <h6>${voc.data().subject} | ${voc.data().branch}.Engg </h6>
                   <h6> Room No: ${voc.data().room} | ${voc.data().sem}th SEM </h6>
                   <h6>Total Students: ${a}</h6>
                   </div>
                   <div class="students${a}"></div>
                   <div class="input-field white">
                   <textarea id="textarea1" class="materialize-textarea " style="height: 100px; border: 1px solid black; border-radius: 5px;"></textarea>
                   <label for="textarea1">Yesterday's Topic</label>
                   </div>
                   <div class="center">
                   <a href="" class="btn indigo left-align waves-effect waves-lighten-2">&nbsp; SUBMIT &nbsp;</a>
                   &nbsp;&nbsp;&nbsp; 
                   <a href="#modal1" class="btn pink left-align waves-effect waves-lighten-2 modal-trigger">&nbsp; RESET &nbsp;</a>
                 </div>
                 </br>

                   </div>`;
             
                tatd[a].innerHTML=div;
                tatd[a].setAttribute('id',voc.id);
                //setting students
                const stud = document.querySelector('.students'+a);
                console.log(stud);
               db.collection('student').where('branch','==',voc.data().branch).where('sem','==',voc.data().sem).get().then((eoc) => {
                eoc.forEach((foc)=>{
                  const html =`    
                  <div class="card-panel stud-atd" id="${foc.id}">
                  <strong>${foc.data().name}</strong>  
                   <span>  ${foc.data().rollNo}  </span>
                    <label class="right">
                      <input type="checkbox" />
                      <span></span>
                    </label>
                   </div>`;
                   stud.innerHTML+=html;
                }) 
              });
               
                a++;
                console.log(voc.id);

            }


          });

         });

        });


        console.log("Today is : " + daylist[day] + ".");
        console.log("Tomorrow is : " + daylist[day+1] + ".");
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

      console.log("Current Time : "+hour + prepand + " : " + minute + " : " + second);


  }

