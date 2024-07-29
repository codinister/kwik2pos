<?php

	function createTables($dbname,$dbuser,$dbpwd){ 
		try{
			$conn = new PDO("mysql:host=localhost;dbname=".$dbname.";charset=utf8mb4", $dbuser, $dbpwd);
			$conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
			$conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

			if($conn){
			$tb = tables($conn);
			$details = "<?php
			define('host','localhost');
			define('username','$dbuser');
			define('password','$dbpwd');
			define('dbname','$dbname');
			?>";
			file_put_contents(dirname(__DIR__).'/model/constants.php', $details);

			//INSERT MENU
			$conn->query("INSERT INTO menu(menu_id, menu_name,menu_parent) VALUES
			('1', 'Dashboard','null'),
			('2', 'Sales','null'),
			('3', 'Users','null'),
			('4', 'Products','null'),
			('5', 'Note','null'),
			('6', 'SMS','null'),
			('7', 'Leads','null'),
			('8', 'Settings','null'),
			('9', 'Salesinvoice','none'),
			('10', 'Addrowsbutton','none'),
			('11', 'Unitprice','none'),
			('12', 'Invoicedesc','none')
			");

			echo 'Installation completed';
			}
		}
		catch(PDOException $e){
			echo $e;
			exit;
		}
	}

?>