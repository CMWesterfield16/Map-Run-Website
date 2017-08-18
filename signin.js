
var email = document.getElementById('login-password-input').value;
var password = document.getElementById('login-email-input').value;


document.getElementById('btn-register').addEventListener('click', function(){
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
});

document.getElementById('btn-signin').addEventListener('click', function(){
  document.getElementById('login-container').className = 'hidden-container';
  document.getElementById('page-container').className = 'active-container';

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

});

document.getElementById('btn-signout').addEventListener('click', function(){
  document.getElementById('login-container').className = 'active-container';
  document.getElementById('page-container').className = 'hidden-container';
})
