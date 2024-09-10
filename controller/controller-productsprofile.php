<?php
class productsprofile{

	private function response($qry){
		if($qry){
			echo json_encode($qry);
		}
		else{
			echo json_encode([]);
		}
	}

	public function getStocks(){
		$qry = DB::query("SELECT 
			p.*, 
			pr.prod_qty, 
			pr.qty_id, 
			pr.createdAt AS qty_date,
			c.cat_name 
			FROM category as c 
			JOIN products as p ON c.cat_id = p.cat_id 
			LEFT JOIN product_qty as pr ON p.prod_id = pr.prod_id 
			WHERE p.code = ?
		",array(getCode($_SESSION['edfghl']))); 
		$this->response($qry);
	}

	public function getSoldProducts(){
		$qry = DB::query("SELECT s.*, t.createdAt as sale_date, c.fullname, c.cust_id FROM customers as c JOIN tax as t on c.cust_id = t.cust_id JOIN sales as s ON t.tax_id = s.tax_id JOIN products as p ON s.prod_id = p.prod_id WHERE s.code = ? AND t.trans_type = 'invoice' ",array(getCode($_SESSION['edfghl']))); 
		$this->response($qry);
	}


}