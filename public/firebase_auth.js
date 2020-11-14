  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBSptAQ3SUdmfM2EWURPYyE3u9DKu8Ls_w",
    authDomain: "voice4mutes.firebaseapp.com",
    databaseURL: "https://voice4mutes.firebaseio.com",
    projectId: "voice4mutes",
    storageBucket: "voice4mutes.appspot.com",
    messagingSenderId: "517408785346",
    appId: "1:517408785346:web:a1c6116f43fa0b95e9cc5b",
    measurementId: "G-4WZ5ZZ3TGX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  function signin(){
      var userEmail = document.getElementById("emailin").value;
      var userPass = document.getElementById("passin").value;
      console.log(userEmail);
      firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
  
          window.alert("Error:" + error.message);
          // ...
        });
  }

  function signup(){
    var email=document.getElementById("emailup").value;
    var password=document.getElementById("passup").value;
    var name = document.getElementById("nameup").value;
    
    //Create User with Email and Password
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
        // [END createwithemail]
        // callSomeFunction(); Optional
        // var user = firebase.auth().currentUser;
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(function() {
            alert('success');
            // Update successful.
        }, function(error) {
            // An error happened.
            alert('error');
        });        
    }, function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            console.error(error);
        }
        // [END_EXCLUDE]
    });
  }

  function logout(){
    firebase.auth().signOut().then(function() {
  // Sign-out successful.
  console.log('User Logged Out!');
}).catch(function(error) {
  // An error happened.
  console.log(error);
});
  }