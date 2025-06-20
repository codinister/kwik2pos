<?php
	class login{



	private function getCurrentDateTime(){
		$hr = 60 * 60;
		$t = time() + $hr;
		return date('Y-m-d H:i:s', $t);
	}

		public function signin(){

		
			$arr = json_decode($_POST['data'],TRUE);
			extract($arr);


			validation::empty_validation(
				array(
					'User Name'=>$username, 
					'Password'=>$password
				)
			);


			$user = DB::get_row("SELECT 
			u.code,
			u.createdAt,
			u.email,
			u.firstname,
			u.hire_date,
			u.lastname,
			u.login_date,
			u.phone,
			u.photo,
			u.residence,
			u.role_id,
			u.signature,
			u.status,
			u.user_id, 
			u.password
			FROM  users as u JOIN settings as s ON u.code = s.code  WHERE u.username = ? AND s.app_status = 'active' AND u.status = 'Unblock' AND s.app_expiry_date  > NOW() ",array($username));

		
	
			if($user['user_id']){
				
				$hash_pass = $user['password'];
				$code = $user['code'];
				$user_id = $user['user_id'];


				if(password_verify($password, $hash_pass)) {
				DB::query("UPDATE users SET  login_date = ? WHERE user_id = ?",array($this->getCurrentDateTime(), $user['user_id']));	

				$settings = DB::get_row("SELECT * FROM settings WHERE code =?", array($code));
				$menu = DB::query("SELECT * FROM user_menu WHERE user_id = ?",array($user_id));
					echo json_encode(array(
						'user' => $user, 
						'settings' => $settings, 
						'menu' => $menu
					));
				}
				else{
				echo 'error: Invalid credentials!';
				}
			}
			else{
				echo 'error: Invalid credentials!';
			}
		}


	}
?>

