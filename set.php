<?php 

include 'model/utils.php';





DB::query("UPDATE settings SET industry = ? WHERE industry = ? ",array(
'retails', 
'retailing'
));

DB::query("UPDATE settings SET industry = 'rentals'  WHERE industry ='billboard company' ");

$qry = DB::query("SELECT comp_name,industry FROM settings");
if($qry){
    echo '<pre>'; 
    print_r($qry); 
    echo '</pre>';
}