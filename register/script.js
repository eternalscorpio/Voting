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


$(document).ready(function(){
    
  // Variables
  var clickedTab = $(".tabs > .active");
  var tabWrapper = $(".tab__content");
  var activeTab = tabWrapper.find(".active");
  var activeTabHeight = activeTab.outerHeight();
  
  // Show tab on page load
  activeTab.show();
  
  // Set height of wrapper on page load
  tabWrapper.height(activeTabHeight);
  
  $(".tabs > li").on("click", function() {
      
      // Remove class from active tab
      $(".tabs > li").removeClass("active");
      
      // Add class active to clicked tab
      $(this).addClass("active");
      
      // Update clickedTab variable
      clickedTab = $(".tabs .active");
      
      // fade out active tab
      activeTab.fadeOut(250, function() {
          
          // Remove active class all tabs
          $(".tab__content > li").removeClass("active");
          
          // Get index of clicked tab
          var clickedTabIndex = clickedTab.index();

          // Add class active to corresponding tab
          $(".tab__content > li").eq(clickedTabIndex).addClass("active");
          
          // update new active tab
          activeTab = $(".tab__content > .active");
          
          // Update variable
          activeTabHeight = activeTab.outerHeight();
          
          // Animate height of wrapper to new tab height
          tabWrapper.stop().delay(50).animate({
              height: activeTabHeight
          }, 500, function() {
              
              // Fade in active tab
              activeTab.delay(50).fadeIn(250);
              
          });
      });
  });
});

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
  if (validate_field(full_name) == false || validate_field(favourite_song) == false || validate_field(milk_before_cereal) == false) {
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
      repass : repass,
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