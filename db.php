<?php 
		try{
$conn = new PDO("mysql:host=localhost;dbname=fastroi_shipping;charset=utf8mb4", "fastroi_shipping","website2024");

$conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
$conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

$table1 = "
CREATE TABLE IF NOT EXISTS employee (
emp_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
employee_id VARCHAR(200) NOT NULL,
employee_first_name VARCHAR(200) NOT NULL,
employee_last_name VARCHAR(200) NOT NULL,
job_description  TEXT NOT NULL
)ENGINE=InnoDB;
";
$conn->query($table1);



$table2 = "
CREATE TABLE IF NOT EXISTS shipping (
vess_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
vessel_name  VARCHAR(200) NOT NULL,
country_of_origin  VARCHAR(200) NOT NULL,
vessel_owner_firstname  VARCHAR(200) NOT NULL,
vessel_owner_lastname  VARCHAR(200) NOT NULL,
departure_date DATETIME,
arrival_date DATETIME, 
emp_id INT(11) NOT NULL,
FOREIGN KEY employeeFK(emp_id) REFERENCES employee(emp_id)
ON DELETE CASCADE
ON UPDATE CASCADE
)ENGINE=InnoDB;
";
$conn->query($table2);





$table3 = "
CREATE TABLE IF NOT EXISTS customs_officials (
off_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
offi_first_name VARCHAR(200) NOT NULL,
offi_last_name VARCHAR(200) NOT NULL,
offi_number VARCHAR(200) NOT NULL,
rank VARCHAR(200) NOT NULL,
division  VARCHAR(200) NOT NULL
)ENGINE=InnoDB;
";
$conn->query($table3);




$table4 = "
CREATE TABLE IF NOT EXISTS consignment (
cons_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
container_number VARCHAR(200) NOT NULL, 
type_of_goods VARCHAR(200) NOT NULL, 
terminal_number VARCHAR(200) NOT NULL, 
shipping_number VARCHAR(200) NOT NULL,
clearance_date DATETIME,
vess_id INT(11) NOT NULL,
FOREIGN KEY shippingFK(vess_id) REFERENCES shipping(vess_id)
ON DELETE CASCADE
ON UPDATE CASCADE, 
off_id INT(11) NOT NULL,
FOREIGN KEY customs_officialsFK(off_id) REFERENCES customs_officials(off_id)
ON DELETE CASCADE
ON UPDATE CASCADE
)ENGINE=InnoDB;
";
$conn->query($table4);


}
catch(PDOException $e){
    echo $e;
    exit;
}











































