<?php
class user{

	private function save_user(
		$user_id,
		$firstname,
		$lastname,
		$phone,
		$residence,
		$email,
		$hire_date,
		$birthdate,
		$username,
		$password,
		$status,
		$role_id, 
		$createdAt,
		$code
	){

		DB::query("INSERT INTO users(
			user_id,
			firstname,
			lastname,
			phone,
			residence,
			email,
			hire_date,
			birthdate,
			username,
			password,
			status,
			role_id,
			createdAt,
			code
		) VALUES( ?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE
			firstname = VALUES(firstname),
			lastname = VALUES(lastname),
			phone = VALUES(phone),
			residence = VALUES(residence),
			email = VALUES(email),
			hire_date = VALUES(hire_date),
			birthdate = VALUES(birthdate),
			username = VALUES(username),
			password = VALUES(password),
			status = VALUES(status),
			role_id = VALUES(role_id),
			createdAt = VALUES(createdAt)
		", array(
			$user_id,
			$firstname,
			$lastname,
			$phone,
			$residence,
			$email,
			$hire_date,
			date('Y-m-d', strtotime($birthdate)),
			$username,
			$password,
			$status,
			$role_id,
			$createdAt,
			$code
	
		));


		$qry = DB::get_row("SELECT user_id FROM users WHERE email = ?",array($email)); 
		if($qry){
			return $qry['user_id']; 
		}
		else{
			return '';
		}
	}


	public function add_user(){
		
		extract(json_decode($_POST['users'], TRUE));
		$menus = json_decode($_POST['menus'], TRUE);


		getUserLimit($_SESSION['edfghl']);


		validation::empty_validation(
			array(
				'First Name' => $firstname, 
				'Last Name' => $lastname,  
				'Phone'  => $phone, 
				'Email' => $email,  
				'Residence' => $residence,  
				'Hire Date'  => $hire_date, 
				'Birthdate'  => $birthdate, 
				'Username'  => $username, 
				'Password'  => $password
			)
		);

		validation::string_validation(
			array(
				'First Name' => $firstname, 
				'Last Name' => $lastname,  
				'Residence' => $residence,  
				'Username'  => $username
			)
		);

		validation::email_validation($email); 
		validation::date_validation($hire_date, 'Hire Date field required!');
		validation::date_validation($birthdate, 'Birthdate field required!');
		validation::phone_validation(array('Phone'=>$phone));

		//Check if username already exists
		$userExists = DB::query("SELECT username FROM users WHERE username = ? AND user_id != ? AND code = ? ", array($username,$user_id,$code));
		if($userExists) {
			output('Username is already in use!');
		}

		//Check if email already exists
		$userExists = DB::query("SELECT email FROM users WHERE email = ? AND user_id !=?", array($email,$user_id));
		if($userExists) {
			output('Email is already in use!');
		}

		//Check if phone already exists
		$userExists = DB::query("SELECT phone FROM users WHERE phone = ? AND user_id != ?", array($phone,$user_id));
		if($userExists) {
			output('Phone is already in use!');
		}


		if($password_count > 30){
			$pass = $password;
	
		}
		else{
			$pass = password_hash($password, PASSWORD_BCRYPT);
		}


		$usid = $this->save_user(
			$user_id,
			$firstname,
			$lastname,
			$phone,
			$residence,
			$email,
			$hire_date,
			$birthdate,
			$username,
			$pass,
			$status,
			$role_id, 
			$createdAt,
			$code
		);


		if(!empty($menus)){

			$cnt = COUNT($menus);

			$menu_arr = array(); 
			$menu_placeholder = array();
			for($i = 0; $i < $cnt; $i++){
				array_push($menu_arr, 
					$menus[$i]['usermenu_id'],   
					$menus[$i]['menu_name'],   
					$menus[$i]['menu_parent'],   
					$menus[$i]['menu_id'],   
					$usid, 
					$code
				);

				array_push($menu_placeholder, '(?,?,?,?,?,?)');
			}


			$placeholder = implode(',', $menu_placeholder);




			DB::query("INSERT INTO user_menu(
			    usermenu_id, 
				menu_name,
				menu_parent,
				menu_id,	
				user_id,
				code
			) VALUES ".$placeholder." ON DUPLICATE KEY UPDATE 
				menu_name = VALUES(menu_name),
				menu_parent = VALUES(menu_parent),
				menu_id = VALUES(menu_id),
				user_id = VALUES(user_id)
			", $menu_arr);
		}

		echo 'New user added successfully!-'.$usid;
	
	}

	private function fileupload($file_name,$file_type,$tmp_name,$existing_image){
        if(!empty($file_name) || !empty($file_type) || !empty($tmp_name)){
		$path = dirname(__DIR__).'/assets/uploads';
		$fext = explode('/', $file_type);
		$ext = $fext[1];
		$fname = mt_rand(100, 999);
		$picname = 'img'.$fname.'.'.$ext;
		$filepath = $path.'/'.$picname;
				
		move_uploaded_file($tmp_name, $filepath);
				
		return $picname;

        }
        else{
            return $existing_image;
        }
    }

	public function update_profile(){

		extract(json_decode($_POST['data'], TRUE));
		
		if(isset($_FILES['signatureupld'])){
			$signature_name = $_FILES['signatureupld']['name'];
			$signature_tmp_name = $_FILES['signatureupld']['tmp_name'];
			$signature_type = $_FILES['signatureupld']['type'];
		}
		else{
			$signature_name = '';
			$signature_tmp_name = '';
			$signature_type = '';
		}


		if(isset($_FILES['photoupld'])){
			$photo_name = $_FILES['photoupld']['name'];
			$photo_type = $_FILES['photoupld']['type'];
			$photo_tmp_name = $_FILES['photoupld']['tmp_name'];
		}
		else{
			$photo_name = '';
			$photo_type = '';
			$photo_tmp_name = '';
		}

		$signature_file = $this->fileupload($signature_name,$signature_type,$signature_tmp_name,$signature);
		$photo_file = $this->fileupload($photo_name,$photo_type,$photo_tmp_name,$photo);


	


		validation::empty_validation(
			array(
				'First Name' => $firstname, 
				'Last Name' => $lastname,  
				'Phone'  => $phone, 
				'Email' => $email,  
				'Residence' => $residence
			)
		);

		validation::string_validation(
			array(
				'First Name' => $firstname, 
				'Last Name' => $lastname,  
				'Residence' => $residence
			)
		);

		validation::email_validation($email); 



		if(isset($password)){

			if(!empty($password)){
			validation::password_validation($password); 
			DB::query("UPDATE users SET password = ? WHERE user_id = ?" ,array(password_hash($password, PASSWORD_BCRYPT),$user_id));
			}
		}

		validation::phone_validation(array('Phone'=>$phone));



		DB::query("
			UPDATE users SET 
			firstname = ?,
			lastname = ?,
			phone = ?,
			residence = ?,
			email = ?,
			signature = ?,
			photo = ?
			WHERE user_id = ?
		", array(
			$firstname,
			$lastname,
			$phone,
			$residence,
			$email,
			$signature_file, 
			$photo_file,
			$user_id
		));


		$users_data = DB::get_row("SELECT 
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
		
		 FROM users WHERE user_id = ?",array($user_id));

		echo json_encode($users_data);

	
	}


	public function delete_user(){
		$user_id = $_GET['user_id'];
		DB::query("DELETE FROM users WHERE user_id = ?",array($user_id));
		echo '';
	}


	public function get_user_menu(){
		$code = $_POST['code'];
		$qry = DB::query("SELECT * FROM user_menu WHERE code = ?",array($code));
		echo json_encode($qry);
	}


	public function constants_check(){
		$qry = DB::get_row("SELECT username FROM users WHERE role_id = '111'");
		if($qry){
			echo 'Yes';
		}
		else{
			echo 'No';
		}
	}
	

	}	
	