<?php
class customer{

	//$this->code()
	private function code(){
		return getCode($_SESSION['edfghl']);
	}



	
	public function update_cust_description(){
		$cust_id = $_POST['cust_id']; 
		$desc = $_POST['descrp']; 

		DB::query("UPDATE customers SET description = ?, updatedAt = NOW() WHERE cust_id =?",array($desc,$cust_id));

		echo '';
	}


	public function getAnonymousCustomer(){
		$qry = DB::get_row("SELECT cust_id,fullname FROM customers WHERE fullname = 'Anonymous' AND code = ?",array($this->code()));

		if($qry){ 
			$arr = array(
				'fullname' => $qry['fullname'],
				'cust_id' => $qry['cust_id']
			);
			echo json_encode($arr);
		}
		else{
			echo json_encode(array(
				'fullname' => '',
				'cust_id' => ''
			));
		}
	}

	private function addCustomersToDatabase(
		$fullname,
		$phone,
		$email,
		$location,
		$ref_id,
		$user_id
	){
		$date = getCurrentDateTime();

		DB::query("INSERT INTO customers(
			fullname,
			phone,
			email,
			location,
			ref_id,
			type,
			user_id,
			createdAt,
			code
		) VALUES(?,?,?,?,?,'customer',?,?,?)",array(
			$fullname,
			$phone,
			$email,
			$location,
			$ref_id,
			$user_id,
			$date,
			$this->code()
		));

		$cust_id = DB::get_row("SELECT cust_id  FROM customers WHERE fullname = ?",array($fullname));

		return $cust_id['cust_id'];
	}

	private function addReferrersToDatabase(
		$ref_fullname,
		$ref_phone,
		$ref_type,
		$user_id,
		$ref_id
	){
		//$date = getCurrentDateTime();

			DB::query("INSERT INTO customers(
				fullname,
				phone,
				ref_type,
				type,
				user_id,
				createdAt,
				code
			) VALUES(?,?,?,'referrer',?,now(),?)",array(
				$ref_fullname,
				$ref_phone,
				$ref_type,
				$user_id,
				$this->code()
			));

			$cust_id = DB::get_row("SELECT cust_id FROM customers WHERE fullname =?",array($ref_fullname));
			return $cust_id['cust_id'];
	}

	public function add_customer(){
		$post = json_decode($_POST['data'],TRUE);
		extract($post);



		//Start customer validation
		validation::empty_validation(
			array(
			'Fullname'=>$cfullname
			)
		);

		validation::string_validation(array('Fullname'=>$cfullname));

		if($cphone){
			validation::phone_validation(array('Phone'=>$cphone));
		}
		if($cemail){
			validation::email_validation($cemail); 
		}
		if($clocation){
			validation::string_validation(array('Location'=>$clocation));
		}

		$cust = DB::query("SELECT fullname FROM customers WHERE fullname = ? AND code =?", array($cfullname,$this->code()));
		if($cust){
			output('Customer name already exists!');
		}

		if($cphone){
			$cust = DB::get_row("SELECT fullname FROM customers WHERE phone = ? AND code =?", array($cphone,$this->code()));
			if($cust){
				$fname = $cust['fullname'];
				output('Phone number is in use by '.$fname);
			}
		}

		//End customer validation 




		//Begin referrer validation

		if(!empty($custname)){

			validation::empty_validation(
				array(
				'Referrer Name'=>$custname,
				'Referrer Phone'=> $rphone,
				'Referrer Type' => $ref_type
				)
			);

			validation::phone_validation(array('Referrer Phone'=>$rphone));

			validation::string_validation(
				array(
				'Referrer Name'=>$custname
				)
			);
	
			$ref_id = $this->addReferrersToDatabase(
				$custname,
				$rphone,
				$ref_type,
				$_SESSION['edfghl'],
				$cust_id
			);
			
		}
		else{
			$ref_id = 0;
		}

		//End referrer validation




		$cust_id = $this->addCustomersToDatabase(
			$cfullname,
			$cphone,
			$cemail,
			$clocation,
			$ref_id,
			$_SESSION['edfghl']
		);

		$activity="Added customer  ".$cfullname."";
		history($_SESSION['edfghl'],'',$activity);

		echo 'Customer added successfully!-'.$cust_id;

	}


	public function update_customer(){
		$post = json_decode($_POST['data'],TRUE);
		extract($post);

		validation::empty_validation(
			array(
			'Fullname'=>$fullname
			)
		);

		validation::string_validation(
			array(
			'Fullname'=>$fullname
			)
		);

		if($phone){
			validation::phone_validation(array('Phone'=>$phone));
		}
		if($email){
			validation::email_validation($email); 
		}

		DB::query("UPDATE customers SET 
			fullname = ?,
			phone = ?,
			email = ?,
			location = ?,
			type = ?,
			updatedAt = NOW()
			WHERE cust_id = ?
		",array(
			$fullname,
			$phone,
			$email,
			$location,
			$type,
			$cust_id
		));
		$activity="Updated customer ".$fullname."";
		history($_SESSION['edfghl'],'',$activity);

		echo 'Customer updated successfully!';

	}

	public function delete_customer(){
		$arr = json_decode($_POST['data'], TRUE); 
		extract($arr);
		DB::query("DELETE FROM customers WHERE cust_id =?",array($cust_id));
		$activity = "Deleted customer ".$fullname." ";
		history($_SESSION['edfghl'],'',$activity); 
		echo '';
	}

}
