<?php 

include 'model/utils.php';

$tx = DB::query("SELECT tax_id FROM tax"); 

if($tx){
    foreach($tx as $v){

        $tax_id = $v['tax_id']; 
        $uuid = mt_rand(1000, 1000000).$tax_id;

        DB::query("UPDATE tax SET uuid = ? WHERE tax_id = ?", array($uuid, $tax_id));


    }

    $q = DB::query("SELECT uuid FROM tax"); 
    if($q){
        echo '<pre>';
        print_r($q); 
        echo '</pre>';
    }
}