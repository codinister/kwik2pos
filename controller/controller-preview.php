<?php
class preview{

    public function settings(){
        $code =  $_GET['code'];
        $sett = DB::query("SELECT * FROM settings WHERE code = ?",array($code));
        echo json_encode($sett);
    }

    public function customer(){
        $cust_id =  $_GET['cust_id'];
        $customer = DB::query("SELECT * FROM customers WHERE cust_id = ?",array($cust_id));
        echo json_encode($customer);
    }

    public function user(){
        $user_id =  $_GET['user_id'];
        $users = DB::query("SELECT * FROM users WHERE user_id = ?",array($user_id));
        echo json_encode($users);
    }

    public function tax(){
        $tax_id =  $_GET['tax_id'];
        $tax = DB::query("SELECT * FROM tax WHERE tax_id = ?",array($tax_id));
        echo json_encode($tax);
    }

    public function contracts(){
        $tax_id =  $_GET['tax_id'];
        $tax = DB::query("SELECT * FROM contracts WHERE tax_id = ?",array($tax_id));
        echo json_encode($tax);
    }


    public function contacts(){

        $user_id = $_GET['user_id']; 
        $code = $_GET['code']; 


        if($user_id !== ''){
            $custs = DB::query("SELECT * FROM customers WHERE user_id = ?",array($user_id));
            echo json_encode($custs);
        }
        else if($code !== ''){
            $custs2 = DB::query("SELECT * FROM customers WHERE code = ?",array($code));
            echo json_encode($custs2);
        }


    
    }
    
    public function sales(){
        $tax_id =  $_GET['tax_id'];
        $sale = DB::query("SELECT s.*, p.prod_size FROM sales as s LEFT JOIN products as p ON s.prod_id = p.prod_id  WHERE s.tax_id = ?", array($tax_id));
        echo json_encode($sale);
    }


    public function payment(){
        $tax_id =  $_GET['tax_id'];

        $pay = DB::query("SELECT 
        t.*,
        p.createdAt as rec_date, 
        p.* 
        FROM tax as t 
        JOIN payment_history as p 
        ON p.tax_id = t.tax_id 
        WHERE p.tax_id = ?",array($tax_id)); 

        echo json_encode($pay); 
    }





















    public function sales_by_custid(){
        $cust_id =  $_GET['cust_id'];
        $tax = DB::query("SELECT * FROM tax WHERE cust_id = ?",array($cust_id));
        echo json_encode($tax);
    }


    public function payment_by_custid(){
        $cust_id =  $_GET['cust_id'];

        $pay = DB::query("SELECT 
        p.createdAt as rec_date, 
        p.* 
        FROM payment_history as p 
        WHERE cust_id = ?",array($cust_id)); 

        echo json_encode($pay); 
    }



}


