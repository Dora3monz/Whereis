
<?php
$servername = "localhost";
$username = "wheris_user";
$password = "yIFAC23IRAGrUQpC";
$dbname = "wheris";

$n = $_GET['n']; //name
$p = $_GET['p']; //pass
$e = $_GET['e']; //email
$m = $_GET['m']; //mobile
$s = substr(str_shuffle(str_repeat("0123456789QWERTYUIOPASDFGHJKLZXCVBNM", 6)), 0, 6);
$d = $_GET['d']; //device_id
$dt = $_GET['dt']; //device_type


// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$checkemail = mysqli_query($conn,"SELECT * FROM users WHERE email = '".$e."' ");
$rowcount = mysqli_num_rows($checkemail);
$sql = "INSERT INTO users (name,email,mobile,sms_code,device_type,device_id,password,status,notify)VALUES ('".$n."', '".$e."',  '".$m."',  '".$s."', '".$dt."', '".$d."', '".$p."',0,0)";




if ($rowcount == 0 && $n != '' && $p != '' && $e != '') {
   mysqli_query($conn, $sql);
   
    /*todo : Send SMS Notification Verification Code to New User */
    echo '[{"msg":"Success Please Login Now","status":"1"}]';
	
} elseif ($rowcount > 0 ) {
   
    echo '[{"msg":"Email exist","status":"2"}]';
	
} else {
	echo '[{"status":"3"}]';
    //echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}


mysqli_close($conn);
?>
