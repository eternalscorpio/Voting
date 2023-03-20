
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBljkdlX7TV_7-CBO8tAS4ytXW6OrsgErE",
    authDomain: "voting-e346d.firebaseapp.com",
    projectId: "voting-e346d",
    storageBucket: "voting-e346d.appspot.com",
    messagingSenderId: "652681224630",
    appId: "1:652681224630:web:a0468b00a12cf88903a117",
    measurementId: "G-VQV12W5X4W"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()



// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  repass = document.getElementById('repass').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is not filled!!')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false) {
    alert('One or More Extra Fields is to be filled!!')
    return
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      password : password,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('User Logged In!!')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message
    alert(error_message)
})
}




// Validate Functions
function validate_email(email) {
expression = /^[^@]+@\w+(\.\w+)+\w$/
if (expression.test(email) == true) {
  // Email is good
  return true
} else {
  // Email is not good
  return false
}
}

function validate_password(password) {
// Firebase only accepts lengths greater than 6
if (password < 6) {
  return false
} else {
  return true
}
}

function validate_field(field) {
if (field == null) {
  return false
}

if (field.length <= 0) {
  return false
} else {
  return true
}
}

function returnToast(toastMessage, tcounter) {
  tm = '<div class="tomsg UIS" id = "modalContainer' + tcounter + '"><p style="color: grey;">Server ::::</p><p class = "msgP" id = "toastCont">';
  tm += toastMessage + '</p></div>';
  return tm;
}

var toastCount = 0;

function showToast(toastMessage, time) {
  toastCount = toastCount + 1;
  toastRAW = returnToast(toastMessage, toastCount);
  renderToast(toastRAW, toastCount, time);
}

function renderToast(toastRAW, tcnt, timeTo) {
  d("mcm").innerHTML += toastRAW;
  setTimeout(() => {
      d("modalContainer" + tcnt).style.display = "none";
  }, timeTo * 1000)
}

var credential;

function googleSignInPopup() {

    var provider1 = new firebase.auth.GoogleAuthProvider();
    console.log("here");
    firebase.auth().signInWithPopup(provider1).then((result) => {
        credential = result.credential;
        console.log(credential["photoURL"]);
        console.log("suc");
        var token = credential.accessToken;
        var user = result.user;
        console.log("loggedin");
        showToast("Logged In Successfully", 5);
    }).catch((error) => {
        //var errorCode = error.code;
        //var errorMessage = error.message;
        //var email = error.email;
        //var credential = error.credential;
        showToast(error.message, 5);
    });
}


function loginSuccess(){
    d("userName").innerHTML = userData["displayName"];
    d("userDP").src = userData["photoURL"];
}

var state = false;
        function toggle(){
            if(state){
                document.getElementById("password").setAttribute("type","password");
                state=false;
            }
            else{
                document.getElementById("password").setAttribute("type","text");
                state=true;
            }
        }
        function myFunction(show){
            show.classList.toggle("fa-eye-slash");
        }
