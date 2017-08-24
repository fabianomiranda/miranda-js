<?php
$jsonData = array();
$people = array();
if($_POST['family'] == 'father'){
    $people = array('name'=>'Fabiano','lastname'=>'Miranda');
}else if($_POST['family'] == 'son'){
    $people = array('name'=>'Kaio','lastname'=>'Miranda');
}
array_push($jsonData, $people);

header("Content-Type: application/json;charset=utf-8");
echo json_encode($jsonData);