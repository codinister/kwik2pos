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
		$qry = DB::query("SELECT 
			code,
			createdAt,
			email,
			firstname,
			hire_date,
			lastname,
			login_date,
			phone,
			photo,
			residence,
			role_id,
			signature,
			status,
			user_id
		 FROM users WHERE code = ?",array($code));
		$this->response($qry);
	}

	public function usersPrivilleges(){
		$code = $_GET['code'];
		$qry = DB::query("SELECT um.usermenu_id, m.menu_name, m.menu_id FROM user_menu as um JOIN menu as m ON um.menu_id = m.menu_id WHERE code = ?",array($code));
		$this->response($qry);
	}

	public function usersNotes(){
		$code = $_GET['code'];
		$qry = DB::query("SELECT * FROM note WHERE code = ?",array($code));
		$this->response($qry);
	}

}