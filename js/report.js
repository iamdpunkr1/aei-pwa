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
        console.log('Inside STAFF.js');
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

   let p=0;

//set faculty details function
const setUI = user => {
    const name= document.querySelector('.name');
    const dept= document.querySelector('.dept');
    const subjects= [];
    const report = document.getElementById('report');



    //settting Faculty Name
    db.collection('faculty').doc(user.uid).get().then(doc => {
        const html = ` <span class="white-text ">${doc.data().name}</span>`;
        name.innerHTML= html;
        dept.textContent=doc.data().dept + " Department";

        db.collection('attendence').where('fid','==',doc.data().fid).get().then((each)=>{
            each.forEach(e=>{
                if(subjects.includes(e.data().subject)){

                  const details = document.getElementById(e.data().subject);                    
                  console.log(details.id)         
                      db.collection('student').get().then(stud=>{
                        stud.forEach(ee=>{
                          for(var i in ee.data().subjects){
                             if(i==e.data().subject){
                               const html=`
                               <tr>
                               <td>${ee.data().name}</td>
                               <td>${ee.data().rollNo}</td>
                               <td>${ee.data().subjects[i].total}</td>
                               <td>${ee.data().subjects[i].attended }</td>
                               <td>${((ee.data().subjects[i].attended / ee.data().subjects[i].total)*100).toFixed(0)}%</td>
                              </tr>`;
                              details.innerHTML+=html;
                             }
                          }
                                             
                        })
                      })

                  
                }else{
                    subjects.push(e.data().subject)
                      const html=`
                      <li id="${p}">
                      <div class="collapsible-header " >
                        <strong>${e.data().subject}</strong> 
                      </div>
                      <div class="collapsible-body">
                        <table class="striped centered repo" >
                          <thead>
                            <tr>
                                <th>NAME</th>
                                <th>ROLLNO</th>
                                <th>TOTAL</th>
                                <th>ATTENDED</th>
                                <th>PERCENT</th>
                            </tr>
                          </thead>
                  
                          <tbody id="${e.data().subject}"></tbody>
                        </table>
                        <br>
                        <div class="center">
                          <a class="btn-small indigo waves-effect" onclick="createPDF(${p})">PRINT</a>
                        </div>        
                      </div>
                    </li>   
                                 `;

                    report.innerHTML+=html;
                    
                   

                    const details = document.getElementById(e.data().subject);                    
                    console.log(details.id)         
                        db.collection('student').get().then(stud=>{
                          stud.forEach(ee=>{
                            for(var i in ee.data().subjects){
                               if(i==e.data().subject){
                                 const html=`
                                 <tr>
                                 <td>${ee.data().name}</td>
                                 <td>${ee.data().rollNo}</td>
                                 <td>${ee.data().subjects[i].total}</td>
                                 <td>${ee.data().subjects[i].attended }</td>
                                 <td>${((ee.data().subjects[i].attended / ee.data().subjects[i].total)*100).toFixed(0)}%</td>
                                </tr>`;
                                details.innerHTML+=html;
                               }
                            }
                                               
                          })
                        })
                   
                }
                p++;
                
                
            })      
        })

    })



}

      //Print PDF
      const createPDF=(p) =>{
        var sTable = document.getElementById(p).innerHTML;
  
        var style = "<style>";
        style = style + "table {width: 100%;font: 17px Calibri;}";
        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
        style = style + "padding: 2px 3px;text-align: center;}";
        style = style + "</style>";
  
        // CREATE A WINDOW OBJECT.
        var win = window.open('', '', 'height=700,width=700');
  
        win.document.write('<html><head>');
        win.document.write('<title>Profile</title>');   // <title> FOR PDF HEADER.
        win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
        win.document.write('</head>');
        win.document.write('<body>');
        win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
        win.document.write('</body></html>');
  
        win.document.close(); 	// CLOSE THE CURRENT WINDOW.
  
        win.print();    // PRINT THE CONTENTS.
    }

