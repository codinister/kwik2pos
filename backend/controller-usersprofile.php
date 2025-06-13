<?php
class usersprofile{

	private function response($qry){
		if($qry){
			echo json_encode($qry);
		}
		else{
			echo json_encode([]);
		}
	}

	public function userDetails(){
		$code = $_GET['code'];
		$qry = DB::query("SELECT * FROM users WHERE code = ?",array($code));
		$this->response($qry);
	}

	public function usersPrivilleges(){
		$code = $_GET['code'];
		$qry = DB::query("SELECT * FROM user_menu WHERE code = ?",array($code));
		$this->response($qry);
	}

	public function usersNotes(){
		$code = $_GET['code'];
		$qry = DB::query("SELECT * FROM note WHERE code = ?",array($code));
		$this->response($qry);
	}

}