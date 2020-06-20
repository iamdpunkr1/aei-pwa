auth.onAuthStateChanged(user => {
    if(user){
          //set student details function
          setUI(user);
          //Student Logout
           const logout = document.getElementById('logout');
           logout.addEventListener('click',(e) => {
                    e.preventDefault(); 
                   // console.log("inside signing out");
                   auth.signOut().then(() => {
                          window.open("/index.html","_self");
                        // console.log('after window logout');
                      });
                  }); 
    }else{
      window.location.replace("/index.html");
      setUI([]);
  }
});
const setUI = user => {
    const name= document.querySelector('.name');
    const attendence = document.getElementById('attendence');
    db.collection('student').doc(user.uid).onSnapshot(doc => {
        const html = ` <span class="white-text ">${doc.data().name}</span>&nbsp;&nbsp;<span class="white-text ">|&nbsp;&nbsp;${doc.data().rollNo}</span>
                        <br><span class="white-text ">Registration No: ${doc.data().reg}</span>`;
        name.innerHTML= html;
    //        console.log(doc.data().subjects['Artificial Intelligence'].attended);
        for (var i in doc.data().subjects){
            const html = `
            <li>
            <div class="collapsible-header" id="attendence">
              ${i}
            </div>
            <div class="collapsible-body">
              <table class="highlight centered responsive-table">    
                <thead>
                  <tr>
                      <th>Total classes</th>
                      <th>Attended</th>
                      <th>Percentage(%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${doc.data().subjects[i].total}</td>
                    <td>${doc.data().subjects[i].attended}</td>
                    <td>${((doc.data().subjects[i].attended / doc.data().subjects[i].total)*100).toFixed(0)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
            `;
            attendence.innerHTML+=html;
       //     console.log(i, doc.data().subjects[i]);
         }
    })
}