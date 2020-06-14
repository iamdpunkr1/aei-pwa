                
// add admin cloud function
/*
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
  });
});
*/


// listen for auth status changes

auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
       if (user.admin) {        
         console.log('staff login called');
         window.open("staff.html","_self");
      }else{
         console.log('student login called');
         window.open("std.html","_self");
      }
    }, err => console.log(err.message));
  } 
});
        
       //AEI-login
        const stdlogin = document.querySelector('.std-login');
        stdlogin.addEventListener('submit',(e) => {
              e.preventDefault();
              const email = stdlogin.email.value;
              const password = stdlogin.password.value;

            auth.signInWithEmailAndPassword(email, password).then((user) => {
              stdlogin.reset();
              stdlogin.querySelector('.error').textContent = "";
          }).catch(error => {
                stdlogin.querySelector('.error').textContent = error.message;
         });
       });


