<?php
class sales{



    private function termnalReceipt(){
        $code = $_POST['code'];
		$sett = DB::get_row("SELECT receipt_type FROM settings WHERE code = ?",array($code));
		if($sett){
			if ($sett['receipt_type'] === 'THERMNAL') {
                return true; 
            }
            else{
                return false;
            }
		}
		else{
            return false;
        }
	}


    public function save_contract(){

        $data = json_decode($_POST['data'],TRUE);
        extract($data);


        $insert = DB::query("INSERT INTO contracts(
            cont_id,
            title,
            start_date,
            refferedtoas,
            contractnumber,
            ss_id,
            cust_id, 
            code, 
            otherinfo
        ) VALUES(?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE 
            title = VALUES(title),
            start_date = VALUES(start_date),
            refferedtoas = VALUES(refferedtoas),
            contractnumber = VALUES(contractnumber),
            ss_id = VALUES(ss_id), 
            cust_id = VALUES(cust_id), 
            otherinfo = VALUES(otherinfo)
        ",array(
           $cont_id,
           $title,
           date('Y-m-d', strtotime($start_date)),
           $refferedtoas,
           $contractnumber,
           $ss_id,
           $cust_id, 
           $code, 
           $otherinfo
        ));

        if($insert){
            echo 'Contract saved!';
        }
        else{
            echo 'error';
        }
    }

    //SAVE SALES
    public function save_sales(){

        $payment = flatten(json_decode($_POST['payment'],TRUE));


        $sales_summary = json_decode($_POST['sales'],TRUE);
        $sales = flatten(json_decode($_POST['items'],TRUE));
        
        extract($sales_summary);


        //No item validation
        if (COUNT($sales) < 1) {
            output( 'Add an item to continue!' );
        }

        //Customer field validation
        if ($cust_id < 1) {
            output("Customer's field required!");
        }

        //Invoice description validation
        if(!$this->termnalReceipt()){
            if (COUNT([$profile]) < 1) {
                output('Invoice description required!');
            }
        }

        //Invoice date validation
        validation::date_validation($invoice_date, 'Invoice date field required!');

        $ss_id = saveTransaction($sales_summary, $sales); 

        if(COUNT([$ss_id]) > 0){
            $pay_id = savePayment($ss_id, $payment, $cust_id);
        }
        else{
            $pay_id = '';
        }

        $mess = 'Added '.$trans_type;
        feedback($user_id,$cust_id,$pay_id,$ss_id,$mess);

    }

    public function delete_payment(){
        $pay_id = $_GET['pay_id'];
        $code = $_GET['code'];
        $cust = DB::query("SELECT 
        t.ss_id, 
        c.fullname,
        p.payment
        FROM payments as p 
        JOIN sales_summary as t ON p.ss_id = t.ss_id 
        JOIN customers as c ON c.cust_id = t.cust_id 
        WHERE p.pay_id = ? AND p.code = ?",array($pay_id,$code));

        DB::query("DELETE FROM payments WHERE pay_id = ?",array($pay_id));
        echo '';

        $fullUserName = getFullname($_SESSION['edfghl']);

        //REWRITE
        $receipt_no = inv_num($pay_id);
        $activity= $fullUserName." deleted the amount of ".$cust[0]['payment']." from".$cust[0]['fullname']." receipt. Receipt no. ".$receipt_no."";
        history($_SESSION['edfghl'],'',$activity);

        smsWarnings($activity,$_SESSION['edfghl']);

    }


    
    public function getInvoiceDetails(){

        $cust_id = $_POST['cust_id'];
        $user_id = $_POST['user_id'];
        $ss_id = $_POST['ss_id'];
        $code = $_POST['code'];

        //BEGIN sales_summaryES 
        $tx = DB::get_row("SELECT   
        t.ss_id,
        t.vat,	
        t.nhil,
        t.withholdingsales_summary,
        t.getfund,
        t.covid,
        t.subtotal,
        t.discount,	
        t.total,
        t.profile,	
        t.transportation,	
        t.installation,	
        t.location AS site_location,	
        t.trans_type,	
        t.createdAt AS invoice_date,
        t.cust_id,	
        t.user_id,	
        t.addbank,
        t.note,
        t.uuid,
        t.prepared_by,
        t.vat_rate,
        t.nhil_rate,
        t.getfund_rate,
        t.covid_rate,
        t.withholdingsales_summary_rate,
        t.code,
        c.*,p.pay_type, p.bank_acc_number FROM payments as p RIGHT JOIN sales_summary as t ON p.ss_id = t.ss_id JOIN customers as c ON t.cust_id = c.cust_id WHERE t.ss_id = ? AND t.code = ?",array($ss_id,$code));



        $sales_summaryes = array(
            'vat' => $tx ?  $tx['vat'] : 0,
            'nhil' => $tx ?  $tx['nhil'] : 0,
            'getfund' => $tx ?  $tx['getfund'] : 0,
            'sub_total' => $tx ? $tx['subtotal'] : 0,
            'discount' => $tx ?  $tx['discount'] : 0,
            'covid' => $tx ?  $tx['covid'] : 0,
            'withholdingsales_summary' => $tx? $tx['withholdingsales_summary'] : 0,
            'total' => $tx ?  $tx['total'] : 0,
            'profile' => $tx ? $tx['profile']  :  '',
            'transportation' => $tx ?  $tx['transportation'] : 0,
            'installation' => $tx?  $tx['installation'] : 0,
            'location' => $tx?  $tx['site_location'] : '',
            'prepared_by'  => $tx?  $tx['prepared_by'] : '',
            'previouspayment' => isset($_POST['duplicate']) ? '' : sumPayments($ss_id),
            'newpayment' => 0,
            'balance' => isset($_POST['duplicate']) ? '' :getBalance($ss_id),
            'sales_summarychecked' => $tx? $tx['vat'] > 0 ? true : false : false,
            'withholdingchecked' => $tx? $tx['withholdingsales_summary'] ? true : false : false,
            'user_id' => $tx?  $tx['user_id'] : '',
            'cust_id' => isset($_POST['duplicate']) ? '' :  $tx['cust_id'],
            'cust_name' =>  $tx ?  $tx['fullname'] : '',
            'cust_email' =>  isset($_POST['duplicate']) ? '' : $tx['email'],
            'cust_phone' =>  isset($_POST['duplicate']) ? '' : $tx['phone'],
            'ss_id' => isset($_POST['duplicate']) ? '' :  $tx['ss_id'],
            'trans_type' => $tx?  $tx['trans_type'] : '',
            'pay_type' => $tx?  $tx['pay_type'] : 'Cash',
            'note' =>  isset($_POST['duplicate']) ? '' : $tx['note'],
            'invoice_date' => $tx?  $tx['invoice_date'] : '', 
            'addbank' => $tx? $tx['addbank'] : 0,
            'receipt_date' => '',
            'vat_rate' => $tx? $tx['vat_rate'] : 0,
            'nhil_rate' => $tx? $tx['nhil_rate'] : 0,
            'getfund_rate' => $tx? $tx['getfund_rate'] : 0,
            'covid_rate' => $tx? $tx['covid_rate'] : 0,
            'withholdingsales_summary_rate' => $tx? $tx['withholdingsales_summary_rate'] : 0,
            'code' => $tx? $tx['code'] : '',
            'bank_acc_number' => isset($_POST['duplicate']) ? '' : $tx['bank_acc_number'],
            'uuid' => $tx? $tx['uuid'] : '',
            "contract" => isset($_POST['duplicate']) ? '' : DB::get_row("SELECT * FROM contracts WHERE ss_id =?", array($ss_id))
        );

        //END sales_summaryES 

        //BEGIN PRODUCTS 
        $allproducts = DB::query("SELECT 
            s_id,
            qty,
            prod_id,
            prod_name,
            duration,
            unit_price AS prod_price,
            total, 
            exp_date
            FROM 
            sales WHERE ss_id = ? AND code = ?
        ",array($ss_id,$code));

        $prods = []; 

        foreach($allproducts as $v){
            array_push($prods,[

                "duration" => $v['duration'],
                "exp_date" => $v['exp_date'],
                "prod_id" => $v['prod_id'],
                "prod_name" => $v['prod_name'],
                "prod_price" => $v['prod_price'],
                'prodsize' => '',
                "qty" => $v['qty'],
                "s_id" => isset($_POST['duplicate']) ? '' :  $v['s_id'],
                "total" => $v['total'],
            ] );
        };

        $items = array(
            'sales_summaryes' => $sales_summaryes,
            'products' => $prods
        );

        echo json_encode($items);

    }

    public function delete_invoice(){
        $ss_id = $_GET['ss_id']; 
          $code = $_GET['code']; 
        $cust = DB::query("SELECT c.fullname,t.trans_type FROM customers as c JOIN sales_summary as t ON c.cust_id = t.cust_id WHERE t.ss_id = ? AND t.code = ?",array($ss_id,$code));
        DB::query("DELETE FROM sales_summary WHERE ss_id = ?", array($ss_id));
        DB::query("DELETE FROM sales WHERE ss_id = ?", array($ss_id));
        DB::query("DELETE FROM payments WHERE ss_id = ?", array($ss_id));

        if($cust){
        //REWRITE
        $invoice_no = inv_num($ss_id);

        $fullUserName = getFullname($_SESSION['edfghl']);
        if($cust[0]['trans_type'] == 'invoice'){
            $activity= $fullUserName." deleted Sales Invoice of".$cust[0]['fullname']." Invoice Number".$invoice_no."";
            history($_SESSION['edfghl'],'',$activity);
            smsWarnings($activity,$_SESSION['edfghl']);
        }
        else{
            $activity = $fullUserName." deleted Proforma of".$cust[0]['fullname']." Proforma Number".$invoice_no."";
            history($_SESSION['edfghl'],'',$activity);
        }

    }
    }

    public function addInvoiceNote(){
        $note = $_POST['note'];
        $ss_id = $_POST['ss_id'];
        validation::empty_validation(array('Note'=>$note));
        $note = validation::textboxcleaner($note);
        DB::query("UPDATE sales_summary SET note = ? WHERE ss_id = ?", array($note,$ss_id));
        echo 'Note added successfully!';
    }

    private function getInvoiceSales($cust_id,$trans_type,$code){
        $ref_id = DB::query("SELECT cust_id FROM customers WHERE ref_id = ? AND code = ?",array($cust_id,$code));

        if($ref_id){ 
            $arr = [];
            foreach($ref_id as $v) $arr[] = $v['cust_id'];
            $imp = implode(',',$arr);

            $qry = DB::query("SELECT 
            t.user_id,
            t.cust_id,
            t.ss_id,
            t.createdAt,
            t.total,
            t.profile,
            c.email,
            c.fullname,
            c.phone,
            u.firstname,
            u.lastname
            FROM sales_summary as t JOIN customers as c ON t.cust_id = c.cust_id JOIN users as u ON c.user_id = u.user_id
            WHEREt.trans_type = '".$trans_type."' AND t.cust_id IN(".$imp.")",array($cust_id));

            echo json_encode($qry);
        }
        else{ 
            $qry = DB::query("SELECT 
            t.user_id,
            t.cust_id,
            t.ss_id,
            t.createdAt,
            t.total,
            t.profile,
            c.email,
            c.fullname,
            c.phone,
            u.firstname,
            u.lastname
            FROM sales_summary as t JOIN customers as c ON t.cust_id = c.cust_id JOIN users as u ON c.user_id = u.user_id
            WHERE t.cust_id = ? AND t.trans_type = '".$trans_type."' ",array($cust_id));

            echo json_encode($qry);
        }

    }

    public function getSales(){
        $code = $_POST['code'];
        $qry = DB::query('SELECT s.* FROM sales as s JOIN sales_summary as t ON t.ss_id = s.ss_id WHERE t.trans_type = "invoice" AND s.createdAt > DATE_ADD( NOW(),INTERVAL -365 DAY) AND s.code = ?',array($code));
        if($qry){
            echo json_encode($qry);
        }
        else{
            echo json_encode([]);
        }
    }

    public function getProformas(){
        $cust_id = $_GET['cust_id'];
        $code = $_GET['code'];
        $this->getInvoiceSales($cust_id,'proforma',$code);
    }

    public function getinvoice(){
        $cust_id = $_GET['cust_id'];
        $code = $_GET['code'];
        $this->getInvoiceSales($cust_id,'invoice',$code);
    }


    public function update_payments(){

        $data = extract(json_decode($_POST['data'], TRUE));

        $date = date('Y-m-d H:i:s', strtotime($receipt_date));

        //Update payment history 
        DB::query("UPDATE payments SET payment = ?,createdAt = ? WHERE pay_id = ?",array($payment,$date,$pay_id));

        // $activity="Updated".$fullname." receipt with the amount of ".$payment."";
        // history($_SESSION['edfghl'],'',$activity);

        echo 'Receipt updated successfully!';
    }
}
