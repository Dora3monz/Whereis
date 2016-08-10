
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        
    };

    function onPause() {
        setInterval(function () { location.reload(); }, 60 * 60 * 1000);
      
    };

    function onResume() {
        stopScan();
    };
})();

var foundDevices = [];
var userId = localStorage.getItem("uid");
lato = "";
lono = "";

document.addEventListener('deviceready', function () {
  
    navigator.geolocation.getCurrentPosition(showPosition, onError);
   

    new Promise(function (resolve, reject) {

        bluetoothle.initialize(resolve, reject,
            { request: true, statusReceiver: false });

    }).then(initializeSuccess, handleError);

});

function initializeSuccess(result) {

    if (result.status === "enabled") {
       
        log("Bluetooth is enabled.");
        log(result);
    }

    else {

        document.getElementById("start-scan").disabled = true;

        log("Bluetooth is not enabled:", "status");
        log(result, "status");
    }
}



function showPosition(position) {
    lato = position.coords.latitude;
    lono = position.coords.longitude;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

function start() {
    progressBar();
    offlineScan();
    startScan();
    
}


function offlineScan() {

    document.getElementById("devices").innerHTML = "";
    document.getElementById("services").innerHTML = "";
    document.getElementById("output").innerHTML = "";


    var xmlhttp = new XMLHttpRequest();
    var url = "http://avava.co/api/wheris/scan.php?";

    var str = "uid=" + userId;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url + str, true);
    xmlhttp.send();

    function myFunction(response) {
        var arr = JSON.parse(response);
        var i;
      
            for (i = 0; i < arr.length; i++) {
                var bname = arr[i].bname;
                var baddress = arr[i].uuid;
                var brssi = 0;
                addDevice(bname, baddress, brssi);
            
        }
    }


}


function startScan() {
    //log("Starting scan for devices...", "status");

    foundDevices = [];

    if (window.cordova.platformId === "windows") {

        bluetoothle.retrieveConnected(retrieveConnectedSuccess, {});
    }
    else {

        bluetoothle.startScan(startScanSuccess, {});
    }

   

}

function retrieveConnectedSuccess(result) {

    log("retrieveConnectedSuccess()");
    log(result);

    result.forEach(function (device) {

        addDevice(device.name, device.address, device.rssi);

    });
}

function startScanSuccess(result) {
    
    log("startScanSuccess(" + result.status + ")");

    if (result.status === "scanStarted") {

        log("", "status");
    }
    else if (result.status === "scanResult") {

        if (!foundDevices.some(function (device) {

            return device.address === result.address;

        })) {

            log('FOUND DEVICE:');
            log(result);
            foundDevices.push(result);
            addDevice(result.name, result.address, result.rssi);
           
        }
    }
}


function addDevice(name, address, rssi) {
     var xmlhttp = new XMLHttpRequest();
     var url = "http://avava.co/api/wheris/scan.php?";
     if (rssi == 0) {
         var str = "b=" + name;
     } else {
         var str = "b=" + name + "&q=" + address + "&lat=" + lato + "&lon=" + lono;
     }
    
     xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
             myFunction(xmlhttp.responseText);
         }
     }
     xmlhttp.open("GET", url + str, true);
     xmlhttp.send();
 
     function myFunction(response) {
         var arr = JSON.parse(response);
         var buida = arr[0].uid;
         var tname = arr[0].bname;
         var bname = arr[0].name;
         var image = arr[0].image;
         var blat = arr[0].lat;
         var blon = arr[0].lon;
         var bcolor = arr[0].colour;
         var bdate = arr[0].date;
         var bstatus = arr[0].status;
        
         var userIda = localStorage.getItem("uid");
         //var bbrssi = rssi;
         if (name != null) {
             var the_string = name;
             var parts = the_string.split('_', 2);
             var the_text = parts[0];
         }
         

         var dive = document.createElement("div");
         
         dive.style.height = "100px";
         dive.style.margin = "5px";
         //dive.style.fontSize = "16px";
         //dive.style.marginTop = "10px";
         
         dive.style.backgroundPosition = "bottom right";
         dive.style.backgroundRepeat = "no-repeat";
         dive.style.backgroundSize = "cover";
        
         
         
         if (buida == userIda && rssi == 0) {
             dive.setAttribute('href', "#map-modal");
             dive.setAttribute('class', "portfolio-link");
             dive.setAttribute('data-toggle', "modal");
             dive.style.background = "#"+bcolor+" url('../www/images/icons/"+image+".svg') no-repeat top right";
             dive.style.color = "#FFF";
             //dive.style.filter = "grayscale(100%)";
             dive.innerHTML = "<b>"+bname + "<b/>";
             dive.style.fontSize = "1em";
             dive.style.width = "30%";
             dive.setAttribute("class", "col-xs-6");
         } else if (buida == 0 && rssi != 0 && the_text != "") {
             dive.setAttribute('href', "#map-modal");
             dive.setAttribute('class', "portfolio-link");
             dive.setAttribute('data-toggle', "modal");
             dive.innerHTML = "NEW";
             dive.style.background = "#2ecc71 url('../www/images/icons/padlockopen.svg')";
             dive.setAttribute("class", "col-xs-4");
             dive.style.width = "30%";
             dive.style.color = "#FFF";
             dive.style.fontSize = "0.8em";
         } else {
             dive.style.display = 'none';
             /*dive.style.width = "30%";
             dive.innerHTML = rssi;
             dive.style.background = "#d35400 url('../www/images/icons/padlock.svg')";
             dive.setAttribute("class", "col-xs-4");
             dive.style.color = "#FFF";
             dive.style.fontSize = "1.5em";*/
            

         }
       
  
         
         dive.addEventListener("click", function () {
             stopScan();
          
             document.getElementById('fbna').value = name;
             document.getElementById('addBeaconuuid').value = address;
             document.getElementById('bnameform').value = bname;  
             document.getElementById('map-scan').style.display = 'block';
             document.getElementById('services').style.display = 'none';
             document.getElementById('map-modal').style.display = 'block';
        
             if (bname == "unknown device") {
                 document.getElementById("header").innerHTML = name;
                 document.getElementById('bnameform').value = "";
                
             }
 
             blatblon = new google.maps.LatLng(blat, blon)
             geolocation = document.getElementById('geolocation')
             geolocation.style.height = '100vh';
             geolocation.style.width = '80vm';
             geolocation.style.zIndex = '999';

             var myOptions = {
                 center: blatblon, zoom: 14,
                 mapTypeId: google.maps.MapTypeId.ROADMAP,
                 mapTypeControl: false,
                 navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL }
             }

             var map = new google.maps.Map(document.getElementById("geolocation"), myOptions);
             var locations = [
   ['DPulze', 2.922227, 101.650862, 4],
   ['MAGIC', 2.922098, 101.652385, 5],
   ['Cronulla Beach', 2.918991, 101.646420, 3],
   ['Manly Beach', 2.907505, 101.656065, 2],
   ['Maroubra Beach', 2.908191, 101.638899, 1]
             ];

             var flightPlanCoordinates = [];
             for (i = 0; i < locations.length; i++) {
                 fCoordinates = new google.maps.LatLng(locations[i][1], locations[i][2]);
                 flightPlanCoordinates.push(fCoordinates)
             }

             var flightPath = new google.maps.Polyline({
                 path: flightPlanCoordinates,
                 strokeColor: "#000000",
                 strokeOpacity: 1.0,
                 strokeWeight: 2
             });
             flightPath.setMap(map);
             var micon = '../www/images/icons/'+ image +'map.svg';
             var marker = new MarkerWithLabel({ position: blatblon, map: map, labelContent: bname + "<br>" + bdate, labelAnchor: new google.maps.Point(40, 100), labelClass: "labels", icon: micon });
             for (var i = 0; i < locations.length; i++) {
                 marker = new google.maps.Marker({ position: new google.maps.LatLng(locations[i][1], locations[i][2]), map: map });
             }
             if (bname != "unknown device") {
                 document.getElementById('services').style.display = 'none';
             }
             
             
         });
           

          
         //var aTag = document.createElement('a');
       
         //aTag.innerHTML = "link text";
     
         document.getElementById("devices").appendChild(dive);
 
     }
}



function connect(name, address) {

    document.getElementById("devices").innerHTML = "Here will be the details 2";
    

}



// Stop scanning for bluetoothle devices.
function stopScan() {


    bluetoothle.stopScan();
    if (!foundDevices.length) {

        log("", "status");
    }
    else {

        log("", "status");
   
    }
        

}


function stopScanSuccess() {

    if (!foundDevices.length) {

        log("NO DEVICES FOUND");
    }
    else {

        log("Found " + foundDevices.length + " devices.", "status");
      
    }
}

function log(msg, level) {

    level = level || "log";

    if (typeof msg === "object") {

        msg = JSON.stringify(msg, null, "  ");
    }

    console.log(msg);

    if (level === "status" || level === "error") {

        var msgDiv = document.createElement("div");
        msgDiv.textContent = msg;

        if (level === "error") {

            msgDiv.style.color = "red";
        }

        msgDiv.style.padding = "5px 0";
        msgDiv.style.borderBottom = "rgb(192,192,192) solid 1px";
        document.getElementById("output").innerHTML = msg;
    }
}



document.addEventListener("backbutton", onBackKeyDown, false);
function onBackKeyDown(e) {
    e.preventDefault();
}



function handleError(error) {

    var msg;

    if (error.error && error.message) {

        var errorItems = [];

        if (error.service) {

            errorItems.push("service: " + (uuids[error.service] || error.service));
        }

        if (error.characteristic) {

            errorItems.push("characteristic: " + (uuids[error.characteristic] || error.characteristic));
        }

        msg = "<b style='color:red'>Error on " + error.error + ": " + error.message + "</b>";
    }

    else {

        msg = error;
    }

    log(msg, "error");

    if (error.error === "read" && error.service && error.characteristic) {

        reportValue(error.service, error.characteristic, "Error: " + error.message);
    }
}


function onError(error) {
    alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}


function newBeacon(form) {
    var xmlhttp = new XMLHttpRequest();
    var buuid = form.uuid.value;
    var fbna = form.fbna.value;
    var buid = userId;
    var nameb = form.namee.value;
    var imageb = form.bimage.value;
    var colourb = form.bcolour.value;

    var url = "http://avava.co/api/wheris/create.php?bna=" + fbna + "&uu=" + buuid + "&id=" + buid + "&na=" + nameb + "&img=" + imageb + "&col=" + colourb + "&lat=" + lato + "&lon=" + lono;
  
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  

    function myFunction(response) {
        var arr = JSON.parse(response);
        var status = arr[0].status;
        var msg = arr[0].msg;

        if (status == 1) {
            function alertDismissed() {
                location.reload();
            }

            navigator.notification.alert(
                'Beacon successfully updated',  // message
                alertDismissed,         // callback
                'Its All Good!',            // title
                'OK'                  // buttonName
            );
           

        } else {
            document.getElementById("beaconMsg").innerHTML = "<center>Please fill out all required fields</center>";
        }
    } 
}

function progressBar(bname) {
    var i = 0;
    var counterBack = setInterval(function () {
        i++;
        if (i < 100) {
            $('.progress-bar').css('width', i + '%');
           
        } else {
            clearTimeout(counterBack);
            stopScan();
            document.getElementById('progressbar').style.display = 'none';
        }

    }, 300);
}


document.getElementById("logout").addEventListener("click", avLogout);
function avLogout() {
    localStorage.setItem("uid", '');
    location.href = "index.html";
}
var uido = localStorage.getItem("uid");
if (uido == 0 || uido == '') { location.href = "index.html"; }

document.getElementById("fnamee").innerHTML = localStorage.getItem("fname");
document.getElementById("fnamee").style.fontSize = "0.8em";
document.getElementById("fnamee").style.marginRight = "20px";