<?php 

date_default_timezone_set('Africa/Accra');
error_reporting(E_ALL);
ini_set("display_errors", 1);

require_once 'backend/class.DB.php';
ini_set('memory_limit','10000M');

// $res = DB::query("SELECT ss_id,cust_id FROM sales_summary WHERE trans_type = 'invoice' ");

// $arr = array();
// for($i =0; $i < COUNT($res); $i++){
//     DB::query("UPDATE payments SET cust_id = ? WHERE ss_id = ?", array($res[$i]['cust_id'],$res[$i]['ss_id']));
// }


$qry = DB::query("SELECT payment FROM payments WHERE cust_id = '368'"); 

echo '<pre>'; 
print_r($qry); 
echo '</pre>';


