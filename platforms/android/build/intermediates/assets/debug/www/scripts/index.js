// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.



var uido = localStorage.getItem("uid");
if (uido != 0 || uido != '') { location.href = "dashboard.html"; }

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
       
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        console.log('Received Device Ready Event');
        console.log('calling setup push');
        app.setupPush();
    },
    setupPush: function () {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "633503422046"
            },
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function (data) {
            console.log('registration event: ' + data.registrationId);

            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }
         
        });

        push.on('error', function (e) {
            console.log("push error = " + e.message);
        });

        push.on('notification', function (data) {
            console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
        });
    }
};

function check(form) {
    var xmlhttp = new XMLHttpRequest();
    var email = form.userid.value;
    var pass = form.pswrd.value;
    var url = "http://avava.co/api/wheris/login.php?e=" + email + "&p=" + pass;



    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function myFunction(response) {
        var arr = JSON.parse(response);
        var uid = arr[0].id;
        var jsonfname = arr[0].name;

        if (uid != 0) {

            if (typeof (Storage) !== "undefined") {

                localStorage.setItem("uid", uid);
                localStorage.setItem("fname", jsonfname);
                var fullname = localStorage.getItem("fname");

                location.href = "dashboard.html";
            } else {
                document.getElementById("msg").innerHTML = "Sorry, your browser does not support Web Storage...";
            }

        } else {
            document.getElementById("msg").innerHTML = "<center style='color:white'>Wrong username & Password</center>";

        }

    }
}



