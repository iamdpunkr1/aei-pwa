const authSwitchLinks = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.log .page');
// toggle auth modals
authSwitchLinks.forEach(link => {
  link.addEventListener('click', () => {
    authModals.forEach(modal => modal.classList.toggle('active'));
  });
});

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
        const stdlogin = document.getElementById('std-login');
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
 //forget-password
      const forget = document.getElementById('forget');
      forget.addEventListener('submit',(e) => {
                    e.preventDefault();
                    const emailAddress = forget.email.value;
      
                    auth.sendPasswordResetEmail(emailAddress).then(function() {
                      // Email sent.
                      var toastHTML = '<span class="center align-center">Password reset link successfully sent to your email</span>';
                      M.toast({html: toastHTML});
                    }).catch(function(error) {
                      // An error happened.
                      forget.querySelector('.forgoError').textContent = error.message;
                    });
        });
