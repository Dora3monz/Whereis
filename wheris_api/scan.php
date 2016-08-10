<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
date_default_timezone_set('Asia/Kuala_Lumpur');

$b = $_GET['b'];
$q = $_GET['q'];
$lat = $_GET['lat'];
$lon = $_GET['lon'];
$uid = $_GET['uid'];

//$q = "DE:AE:F8:29:A3:12";

$conn = new mysqli("localhost", "wheris_user", "yIFAC23IRAGrUQpC", "wheris");

$dateu = date("Y-m-d h:i:s A");

if ($lat != '' && $lon != ''){
$sql = "UPDATE beacons SET lat='".$lat."', lon='".$lon."', uuid='".$q."', date='".$dateu."', status='1' WHERE bname='".$b."'";
$conn->query($sql);}

$sqlm = "UPDATE users SET notify ='0'  WHERE id='".$uid."' ";
$conn->query($sqlm);


if ($uid != ''){
$result = $conn->query("SELECT * FROM beacons WHERE user_id = '".$uid."' ");
} else {
$result = $conn->query("SELECT * FROM beacons WHERE  bname = '".$b."'");
}

if (mysqli_num_rows($result) > 0) {
    

 $outp = "[";
 while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "[") {$outp .= ",";}
	$outp .= '{"bname":"'  . $rs["bname"]. '",';
    $outp .= '"uuid":"'  . $rs["uuid"]. '",';
	$outp .= '"uid":"'   . $rs["user_id"]. '",';
    $outp .= '"name":"'   . $rs["name"]. '",';
	$outp .= '"image":"'   . $rs["image"]. '",';
	$outp .= '"lat":"'   . $rs["lat"]. '",';
	$outp .= '"lon":"'   . $rs["lon"]. '",';
	$outp .= '"colour":"'   . $rs["colour"]. '",';
	$outp .= '"date":"'   . $rs["date"]. '",';
	$outp .= '"status":"'   . $rs["status"]. '",';
    $outp .= '"location":"'. $rs["location"]. '"}'; }
$outp .="]";

  } else {
	
    echo '[{"name":"unknown device","uid":"0","image":"unknown","lat":"3.539601","lon":"103.380257","location":""}]'; 
}

echo($outp);


$resulte = $conn->query("SELECT a.bname, a.name, a.lat, a.lon, b.device_id, b.device_type, b.notify, b.id FROM beacons a, users b WHERE b.id = a.user_id AND a.bname='".$b."' ");
if ($resulte->num_rows > 0) {
    while($row = $resulte->fetch_assoc()) {

$latitude = $row["lat"];
$longitude = $row["lon"];
$notify = $row["notify"];
$msgcounter = $notify+1;
$ruid = $row["id"];
$devicetype = $row["device_type"];

if ($ruid != $uid) {

$geocodeFromLatLong = file_get_contents('http://maps.googleapis.com/maps/api/geocode/json?latlng='.trim($latitude).','.trim($longitude).'&sensor=false'); 
$output = json_decode($geocodeFromLatLong);
$status = $output->status;
$address = ($status=="OK")?$output->results[1]->formatted_address:'';
     

$deviceToken = $row["device_id"];
                 

$passphrase = 'almaalia2007';

if ($devicetype == 'iOS'){

$ctx = stream_context_create();
stream_context_set_option($ctx, 'ssl', 'local_cert', 'ckdev.pem');

$fp = stream_socket_client(
  'ssl://gateway.sandbox.push.apple.com:2195', $err,
  $errstr, 60, STREAM_CLIENT_CONNECT|STREAM_CLIENT_PERSISTENT, $ctx);

if (!$fp)
  exit("Failed to connect: $err $errstr" . PHP_EOL);

$body['aps'] = array(
  'alert' => array(
			    'title' => $row["name"],
                'body' => "Found \xf0\x9f\x91\xa6 ".$row["name"]." at \xF0\x9F\x9A\xA9".$address,
	           
			 ),
  'badge' => $msgcounter,
  'sound' => 'default',
 
  );

$payload = json_encode($body);

$msg = chr(0) . pack('n', 32) . pack('H*', $deviceToken) . pack('n', strlen($payload)) . $payload;

$result = fwrite($fp, $msg, strlen($msg));

fclose($fp); 

}

////////////////////////////////////////////////////////////////////////////////

if ($devicetype == 'Android'){

	
define( 'API_ACCESS_KEY', 'AIzaSyATyaPSEKK6Z5WNPizz1g_3J4Z66Sc2YKs' );

$id = $row["device_id"];
$registrationIds = array($id);

$msg = array
(
	'message' 	=> "Found \xf0\x9f\x91\xa6 ".$row["name"]." at  \xF0\x9F\x9A\xA9".$address,
	'title'		=> $row["name"],
	'subtitle'	=> "",
	'tickerText'	=> "Found Alma Alia - Dengkil, Selangor",
	'vibrate'	=> 1,
	'msgcnt' => $msgcounter,
	'sound'		=> "default",
	'largeIcon'	=> 'large_icon',
	'smallIcon'	=> 'small_icon'
);

$fields = array
(
	'registration_ids' 	=> $registrationIds,
	'data'			=> $msg
);
 
$headers = array
(
	'Authorization: key=' . API_ACCESS_KEY,
	'Content-Type: application/json'
);
 
$ch = curl_init();
curl_setopt( $ch,CURLOPT_URL, 'https://android.googleapis.com/gcm/send' );
curl_setopt( $ch,CURLOPT_POST, true );
curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
$result = curl_exec($ch );
curl_close( $ch );

    }
}
	}

$sqls = "UPDATE users SET notify ='".$msgcounter."'  WHERE id='".$ruid."' ";
$conn->query($sqls);
}

$conn->close();
?>