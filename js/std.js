

auth.onAuthStateChanged(user => {
    if(user){

          //set student details function
          setUI(user);
          //Student Logout
           const logout = document.getElementById('logout');
           logout.addEventListener('click',(e) => {
                    e.preventDefault(); 
                    console.log("inside signing out");
                   auth.signOut().then(() => {
                          window.open("/index.html","_self");
                         //console.log('after window logout');
                      });
                  }); 
    }else{
      window.location.replace("/index.html");
      setUI([]);
  }
});

///clock

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


//set student details function
const setUI = user => {


       const name= document.querySelector('.name');
       const std= document.querySelector('.std-details');                  
       const mon = document.getElementById('monday');
       const tue = document.getElementById('tuesday');
       const wed = document.getElementById('wednesday');
       const thu = document.getElementById('thursday');
       const fri = document.getElementById('friday');
       const sat = document.getElementById('saturday');

       const setRoutine=(voc,day)=>{
        const html= `   <div class="card-panel routine col s12">
                         <h5>${voc.data().subject}</h5>
                         <hr>
                         <p>${voc.data().name}<br>
                         Room: ${voc.data().room} <br>
                         Time: ${voc.data().time}
                        </p>
                      </div>`;
                      day.innerHTML+=html;
       }

       db.collection('student').doc(user.uid).onSnapshot(doc => {
             const html = ` <span class="white-text ">${doc.data().name}</span>&nbsp;&nbsp;<span class="white-text ">|&nbsp;&nbsp;${doc.data().rollNo}</span>
                             <br><span class="white-text ">Registration No: ${doc.data().reg}</span>`;
             name.innerHTML= html;
             
            const div = `    <h5 class="grey-text text-darken-3"><strong>${doc.data().branch} Engg Dept<strong></h5>
                             <p class="grey-text text-darken-2">Semester: ${doc.data().sem} <br>Please logout and login to see changes</p>`;
            std.innerHTML=div;

            if(doc.data().branch === 'Computer' && doc.data().sem === 6) {      
               db.collection('routine').where('branch','==',doc.data().branch).where('sem','==',doc.data().sem).orderBy('period').onSnapshot(coc=>{
                   coc.forEach((voc)=>{
                       if(voc.data().day === 'Monday'){              
                              setRoutine(voc,mon);
                          }

                          if(voc.data().day === 'Tuesday'){
                            setRoutine(voc,tue);
                          }

                          if(voc.data().day === 'Wednesday'){
               
                            setRoutine(voc,wed);
                          }

                          if(voc.data().day === 'Thursday'){
               
                            setRoutine(voc,thu);
                          }

                          if(voc.data().day === 'Friday'){
               
                            setRoutine(voc,fri);
                          }

                          if(voc.data().day === 'Saturday'){
               
                            setRoutine(voc,sat);
                          }
           })  
     
       });
   }


   });
  }




           
           
