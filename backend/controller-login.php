<?php
	class login{

		public function signin(){
			$arr =json_decode($_POST['data'],TRUE);
			extract($arr);

			validation::empty_validation(
				array(
					'User Name'=>$username, 
					'Password'=>$password
				)
			);

			$user = DB::get_row("SELECT u.* FROM  users as u JOIN settings as s ON u.code = s.code  WHERE u.username = ? AND s.app_status = 'active' AND u.status = 'Unblock' AND s.app_expiry_date  > NOW() ",array($username));
	
			if($user){
				
				$hash_pass = $user['password'];
				$code = $user['code'];
				$user_id = $user['user_id'];

				if(password_verify($password, $hash_pass)) {
				DB::query("UPDATE users SET  login_date = 'now()' WHERE user_id = ?",array($user['user_id']));	

				$settings = DB::get_row("SELECT * FROM settings WHERE code =?", array($code));
				$menu = DB::query("SELECT * FROM user_menu WHERE user_id = ?",array($user_id));
					echo json_encode(array(
						'user' => $user, 
						'settings' => $settings, 
						'menu' => $menu
					));
				}
			}
			else{
				echo 'error: Invalid credentials!';
			}
		}


	}
?>

