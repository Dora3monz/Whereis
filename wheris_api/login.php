<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$e = $_GET['e'];
$p = $_GET['p'];
//$q = "DE:AE:F8:29:A3:12";
//echo $n;
//echo $p;
$conn = new mysqli("localhost", "wheris_user", "yIFAC23IRAGrUQpC", "wheris");

$result = $conn->query("SELECT * FROM users WHERE email = '".$e."' AND password = '".$p."' ");


    if (is_null($rs = $result->fetch_array(MYSQLI_ASSOC))) {
     
		echo '[{"id":"0"}]';

	} else {

	$outp = "[";
    if ($outp != "[") {$outp .= ",";}
    $outp .= '{"id":"'  . $rs["id"]. '",';
	$outp .= '"name":"'  . $rs["name"]. '",';
    $outp .= '"password":"'. $rs["password"]. '"}'; 
	$outp .="]";
    echo($outp); 
	}


$conn->close();


?>