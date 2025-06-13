<?php
class customersprofile{

	private function response($qry){
		if($qry){
			echo json_encode($qry);
		}
		else{
			echo json_encode([]);
		}
	}

	public function getCustomers(){
		$code = $_GET['code'];
		$qry = DB::query("SELECT c.*, u.firstname, u.lastname FROM customers as c JOIN users as u ON c.user_id = u.user_id WHERE c.code = ?", array($code)); 
		$this->response($qry);
	}

	public function getReceipts(){
			$code = $_GET['code'];
		$qry = DB::query("SELECT p.*, t.cust_id,t.profile, t.total FROM payments AS p JOIN sales_summary AS t ON p.ss_id = t.ss_id WHERE p.code = ?", array($code)); 
		$this->response($qry);
	}

	public function getInvoices(){
		$code = $_GET['code'];
		$qry = DB::query("SELECT 
		t.*, 
		s.exp_date,
		t.createdAt as sales_date
		FROM sales_summary as t JOIN sales as s ON t.ss_id = s.ss_id WHERE t.trans_type = 'invoice' AND t.code = ?", array($code)); 
		$this->response($qry);
	}

	public function getProformas(){
			$code = $_GET['code'];
		$qry = DB::query("SELECT * FROM sales_summary WHERE trans_type = 'proforma' AND code = ?", array($code)); 
		$this->response($qry);
	}



}





