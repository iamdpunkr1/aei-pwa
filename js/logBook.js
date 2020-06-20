auth.onAuthStateChanged(user => {
    if(user){
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            if(user.admin){
  //              console.log("user is an admin");
                setUI(user);
              }
          });
//        console.log('Inside STAFF.js');
                    //Staff Logout 
                    const slogout = document.getElementById('slogout');
                    slogout.addEventListener('click',(e) => {
                            e.preventDefault(); 
                            console.log("inside signing out");
                        auth.signOut().then(() => {
                            window.open("/index.html","_self");
                            console.log('after window logout');
                        });
                    }); 
            }else{
                window.location.replace("/index.html");
                setUI([]);
            }
   });
//set faculty details function
const setUI = user => {
    const name= document.querySelector('.name');
    const dept= document.querySelector('.dept');
    const log= document.getElementById('table');
    //settting Faculty Name
    db.collection('faculty').doc(user.uid).onSnapshot(doc => {
        const html = ` <span class="white-text ">${doc.data().name}</span>`;
        name.innerHTML= html;
        dept.textContent=doc.data().dept + " Department";
        db.collection('attendence').where('fid','==',doc.data().fid).orderBy('date').onSnapshot(each=>{
            each.forEach(e=>{               
                const html= `
                <tr>
                 <td>${e.data().date}</td>
                 <td>${e.data().branch} Engg</td>
                 <td>${e.data().sem}</td>
                 <td>${e.data().subject}</td>
                </tr> `;
                log.innerHTML+=html;
                console.log('Working')
            })
        })
    })
}