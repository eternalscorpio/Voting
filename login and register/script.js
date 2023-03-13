
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


const firebaseConfig = {
        apiKey: "AIzaSyBljkdlX7TV_7-CBO8tAS4ytXW6OrsgErE",
        authDomain: "voting-e346d.firebaseapp.com",
        projectId: "voting-e346d",
        storageBucket: "voting-e346d.appspot.com",
        messagingSenderId: "652681224630",
        appId: "1:652681224630:web:a0468b00a12cf88903a117",
        measurementId: "G-VQV12W5X4W"
};
      
      // Initialize Firebase
      const app = firebase.initializeApp(firebaseConfig);
      const analytics = firebase.analytics(app);


      var userData

      var credential;
      var errorCodes = {};
      
      function googleSignInPopup() {
        var provider = new firebase.auth.GoogleAuthProvider();
        console.log("here");
        firebase.auth().signInWithPopup(provider).then((result) => {
          credential = result.credential;
          var token = credential.accessToken;
          userData = result.user;
        }).catch((error) => {
          errorCodes["errorCode"] = error.code;
          errorCodes["errorMessage"] = error.message;
          errorCodes["email"] = error.email;
          errorCodes["credential"] = error.credential;
        });
      }
      
      var user;
      
      function loginSuccess(userData) {
        console.log("User Logged in Successfully")
        try {
          afterLogin(userData);
        } catch (error) {
          console.log("error: " + error);
        }
        user = userData;
        console.log(userData.uid);
        queueListener(userData)
      }

var calcStat = false;
var slideNo = 0;
var uid = "";
var slideUrl = "";

      function signInWithEmailPassword() {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
    
        firebase.auth().signInWithEmailAndPassword(email, password)
            .tan((userCredential) => {
                console.log("Signed in");
                loginSuccess();
                var user = userCredential.user;
                uid = "users/" + user["uid"];
                d("previewWindow").src = "../quiz/live/preview.html?" + user["uid"]
                slideStat();
                calcControls();
                readSlideUrl()
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                window.alert(errorMessage);
            });
    }
    
    function updateURL() {
        var newUrl = d("url").value;
        if (newUrl.includes("/embed?")) {
            newUrl = newUrl.split("/embed?")[0];
        }
        if (newUrl.includes("/pub?")) {
            newUrl = newUrl.split("/pub?")[0];
        }
        var wr = firebase.database().ref(uid + "/controls/slideurl").set(newUrl);
    }
    
    function loginSuccess() {
        d("overlay").style.display = "none";
    }

    function readSlideUrl() {
      firebase.database().ref(uid + '/controls/slideurl').on('value', (snap) => {
          setSlide(snap.val());
      })
  }
  
  function setSlide(valueUrl) {
      d("url").value = valueUrl;
      slideUrl = valueUrl;
  }

  function enableCalc(calcFlag) {
    d("ce").innerHTML = calcFlag;
    calcStat = calcFlag;
    if (calcStat) {
        d("tc").style.backgroundColor = "green"
    }
    else {
        d("tc").style.backgroundColor = "red"
    }
}

function calcControls() {
    firebase.database().ref(uid + "/controls/calc/").on('value', (snap) => {
        enableCalc(snap.val());;
    })
}