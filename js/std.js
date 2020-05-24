const db = firebase.firestore();

auth.onAuthStateChanged(user => {
    if(user){

          //set student details function
          setUI(user);

          //Student Logout
           const logout = document.querySelector('.logout');

           logout.addEventListener('click',(e) => {
                    e.preventDefault(); 
                    console.log("inside signing out");
                   auth.signOut().then(() => {
                          window.open("/index.html","_self");
                         console.log('after window logout');
                      });
                  }); 
    }else{
      setUI([]);
      window.location.replace("index.html");
  }
});


//set student details function
const setUI = user => {


       const name= document.querySelector('.name');
       const std= document.querySelector('.std-details');
       db.collection('student').doc(user.uid).get().then(doc => {
             const html = ` <span class="white-text ">${doc.data().name}</span>&nbsp;&nbsp;<span class="white-text ">|&nbsp;&nbsp;${doc.data().rollNo}</span>
                             <br><span class="white-text ">Registration No: ${doc.data().reg}</span>`;
             name.innerHTML= html;
             
            const div = `    <h5 class="grey-text text-darken-3">${doc.data().branch} Engineering Dept</h5>
                               <hr>
                             <p class="grey-text text-darken-2">Semester: ${doc.data().sem} <br>Please logout and login to see details</p>`;
            std.innerHTML=div;
            
            const mon = document.querySelector('#monday');
            const tue = document.querySelector('#tuesday');
            const wed = document.querySelector('#wednesday');
            const thu = document.querySelector('#thursday');
            const fri = document.querySelector('#friday');
            const sat = document.querySelector('#saturday');
            if(doc.data().branch === 'Computer' && doc.data().sem === 6) {      
               db.collection('routine').where('branch','==',doc.data().branch).where('sem','==',doc.data().sem).orderBy('period').get().then(coc=>{
                   coc.forEach((voc)=>{
                       if(voc.data().day === 'Monday'){
               
                                       const html= `   <div class="card-panel dashboard">
                                                       <h5>${voc.data().subject}</h5><hr>
                                                       <p>${voc.data().teacher}<br>
                                                       Room: ${voc.data().room} <br>
                                                       Time: ${voc.data().time}
                                                        </p>
                                                        </div>`;
                                     mon.innerHTML+=html;
                          }

                          if(voc.data().day === 'Tuesday'){
               
                            const html= `   <div class="card-panel dashboard">
                                               <h5>${voc.data().subject}</h5><hr>
                                               <p> ${voc.data().teacher}<br>
                                               Room: ${voc.data().room} <br>
                                               Time: ${voc.data().time}
                                               </p>
                                             </div>`;
                               tue.innerHTML+=html;
                          }

                          if(voc.data().day === 'Wednesday'){
               
                            const html= `   <div class="card-panel dashboard">
                                               <h5>${voc.data().subject}</h5><hr>
                                               <p> ${voc.data().teacher}<br>
                                               Room: ${voc.data().room} <br>
                                               Time: ${voc.data().time}
                                               </p>
                                             </div>`;
                               wed.innerHTML+=html;
                          }

                          if(voc.data().day === 'Thursday'){
               
                            const html= `   <div class="card-panel dashboard">
                                               <h5>${voc.data().subject}</h5><hr>
                                               <p> ${voc.data().teacher}<br>
                                               Room: ${voc.data().room} <br>
                                               Time: ${voc.data().time}
                                               </p>
                                             </div>`;
                               thu.innerHTML+=html;
                          }

                          if(voc.data().day === 'Friday'){
               
                            const html= `   <div class="card-panel dashboard">
                                               <h5>${voc.data().subject}</h5><hr>
                                               <p> ${voc.data().teacher}<br>
                                               Room: ${voc.data().room} <br>
                                               Time: ${voc.data().time}
                                               </p>
                                             </div>`;
                               fri.innerHTML+=html;
                          }

                          if(voc.data().day === 'Saturday'){
               
                            const html= `   <div class="card-panel dashboard">
                                               <h5>${voc.data().subject}</h5><hr>
                                               <p> ${voc.data().teacher}<br>
                                               Room: ${voc.data().room} <br>
                                               Time: ${voc.data().time}
                                               </p>
                                             </div>`;
                               sat.innerHTML+=html;
                          }
           })  
     
       });
   }


   });
  }




           
           
