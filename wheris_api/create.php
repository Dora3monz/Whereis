
<?php
$servername = "localhost";
$username = "wheris_user";
$password = "yIFAC23IRAGrUQpC";
$dbname = "wheris";

$bna = $_GET['bna'];
$uu = $_GET['uu'];
$id = $_GET['id'];
$na = $_GET['na'];
$img = $_GET['img'];
$col = $_GET['col'];
$lat = $_GET['lat'];
$lon = $_GET['lon'];


$dateu = date("Y-m-d h:i:sA");

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


$checkbeacon = mysqli_query($conn,"SELECT * FROM beacons WHERE bname = '".$bna."' ");
$rowcount = mysqli_num_rows($checkbeacon);

$sql = "INSERT INTO beacons (bname, uuid, user_id, name, image, colour, date, lat, lon,flag,status)VALUES ('".$bna."', '".$uu."', '".$id."', '".$na."', '".$img."', '".$col."', '".$dateu."', '".$lat."', '".$lon."','0','1')";

$sqla = "UPDATE beacons SET name='".$na."', image='".$img."', colour='".$col."' WHERE bname='".$bna."' AND user_id='".$id."' ";



if ($rowcount == 0 && $bna != '' && $id != '' && $na != '' && $col != '') {
   mysqli_query($conn, $sql);
    echo '[{"status":"1"}]';
} else if ($rowcount == 1 && $bna != '' && $id != '' && $na != '' && $col != '') {
   mysqli_query($conn, $sqla);
    echo '[{"status":"1"}]';
} else {
	echo '[{"status":"2"}]';
    //echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>
