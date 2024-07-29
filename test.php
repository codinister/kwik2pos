<?php 

include 'model/utils.php';


$sender = 'Thomas'; 
$cust_name = 'Apotica'; 
$phone = '0244 554 333 '; 
$comp_name = 'S.P Agency';
$pay_id = 1;

$url = 'https://app.kwik2pos.com';
$mobile = implode('', explode(' ',$phone));
$encoded = base64_encode($pay_id);


$mess = <<<SMS
Hi! $cust_name this is $sender from $comp_name please click on the link below to view your invoice.
 <br /><br />
$url/assets/pdf/invoice.php?rec=$encoded
SMS;



echo $mess;