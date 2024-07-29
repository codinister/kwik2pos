<?php 

$header = '<img src="../images/header.jpg" alt="logo" width="640" height="110" />';

$signature = getSignature($signatures,$fullname,$width="80",$height="30", $actions);
$logo = getLogo($comp_logo,$width="200",$height="70", $actions);

//INVOICE HEADER 
if($trans_type === 'proforma'){
    $invoice_no_type = 'PROFORMA #';
    $invoice_to_type = 'TO:';
    $invoice_desc = 'Proforma Invoice';
}
else{
    $invoice_no_type = 'SALES INVOICE #';
    $invoice_to_type = 'SALES INVOICE TO:';
    $invoice_desc = 'Sales Invoice';
}

$siteloc = '';
if($site_location){
    $siteloc = '<span style="font-size: 9px; font-weight: bold;">Site Location:</span>
    <span>'.$site_location.'</span>';
}

$web = '';
if($comp_website){
    $web .='<br /><span>&nbsp;&nbsp;<b>Website:</b> '.$comp_website.'</span>';
}

$invoice_header = '<table>
        <tr>
            <td style="width: 510px;">
            <table>
                <tr><td><br />
                <span style="font-size: 9px; font-weight: bold;">
                '.$logo.'
                <br />
                '.$invoice_to_type.'
                </span>
                <br />
                <span><b>Name: </b>'.$cust_name.'</span>
                <br />
                <span><b>Phone: </b>'.$cust_phone.'</span>
                <br />
                <span>'.$siteloc.'</span>
                <br />
     
                <span style="font-size: 9px; font-weight: bold;">'.$invoice_no_type.':
                </span>
                <span>'.$invoice_no.'</span>
                <br />
                <span style="font-size: 9px; font-weight: bold;">DATE:
                </span>
                <span>'.date('d M Y', strtotime($invoice_date)).'</span>
                <br />
                <br />
                <span style="font-size: 9px; font-weight: bold;">GUAGE:
                </span>
                <span>'.$profile.'</span>
                <br />
                <b style="background-color: #c41e34; color: white;font-size: 14px; text-align: center;">&nbsp;&nbsp;'.$invoice_desc.'&nbsp;&nbsp;</b>
                </td>
                    <td style="border-left: solid 1px black;">
                    <strong>'.$header.'</strong>
                    <br />
                    <br />
                    <span>&nbsp;&nbsp;<b>Address:</b> '.$comp_location.'</span>
                    <br /><br />
                    <span>&nbsp;&nbsp;<b>Office Location:</b> '.$comp_location.'</span>
                    <br /><br />
                    <span>&nbsp;&nbsp;<b>Mobile:</b> '.$comp_phone.'</span>
                    <br /><br />
                    <span>&nbsp;&nbsp;<b>Email:</b> '.$comp_email.'</span>
                    '.$web.'
                    <br />
                    </td>
                </tr>
            </table>
            </td>
        </tr>
    </table>
    <br />
    <style>
        td{
            text-align: left;
        }
        strong{
            font-size: 18px;
        }
        h4{
            font-size: 8px;
        }
    </style>
';

$pdf->writeHTMLCell(190,50,'','',$invoice_header,0,1);


//TABLE HEADER
$table_header = '
<table>
<tr>
<td style="width: 30px; border-left: 1px black solid;">#</td>
<td style="width: 281px;">Description</td>
<td style="width: 119px;">Qty</td>
<td style="width: 100px; background-color: #c41e34; color: white;">Total</td>
</tr>
</table>
<style>
table{
    background-color: #cccccc;
    padding: 6px;
}
</style>
';
$pdf->writeHTMLCell(190,5,'','',$table_header,'',1);

//TABLE BODY 
$rows = '';
foreach($items as $k => $v){
    $num = $k + 1;
    $rows .='
        <tr>
        <td style="width: 30px; border-right: solid 1px black;">'.$num.'</td>
        <td style="width: 281px; border-right: solid 1px black;">'.$v['prod_name'].'</td>
  
        <td style="width: 119px; border-right: solid 1px black;">'.$v['qty'].'</td>
        <td style="width: 99px; border-right: solid 1px black;">'.number_format($v['total'], 2, '.', ',').'</td>
        </tr>
    ';

}

$row = '
<table>
'.$rows.'
</table>
<style>
table{
    border-left: solid 1px black;
    border-right: solid 1px black;
    border-bottom: solid 1px black;
    padding: 6px;
}
</style>
';

$pdf->writeHTMLCell(190,0,'','',$row,'',1);


//TABLE FOOTER 

//Sub Total
$sub_total = '
<tr>
<td style="width: 310px;"></td>
<td style="width: 120px; background-color: black; color: white;">Sub Total '.$cur.'</td>
<td style="width: 100px; background-color: #c41e34; color: white;">'.number_format($subtotal, 2, '.', ',').'</td>
</tr>
';

//DISCOUNT 
$discounts = '';
if($discount){ 
$discounts = '
<tr>   
<td style="width: 310px;"></td>
<td style="width: 120px;">Discount '.$cur.'</td>
<td style="width: 100px;">'.number_format($discount, 2, '.', ',').'</td>
</tr>
';
}


//WITHHOLDING TAX
$withholdingtaxs = '';
if($withholdingtax){ 
$withholdingtaxs = '
<tr>
<td style="width: 110px;">WITHHOLDING TAX ('.$withholdingtaxx.'%)</td>
<td style="width: 100px;">'.number_format($withholdingtax, 2, '.', ',').'</td>
</tr>
';
}

//COVID
$covids = '';
if($covid){ 
$covids = '
<tr>
<td style="width: 110px;">WITHHOLDING TAX ('.$covidx.'%)</td>
<td style="width: 100px;">'.number_format($covid, 2, '.', ',').'</td>
</tr>
';
}
 
//NHIS
$nhils = '';
if($nhil){ 
$nhils = '
<tr>
<td style="width: 310px;"></td>
<td style="width: 120px;">NHIL ('.$nhilx.'%)</td>
<td style="width: 100px;">'.number_format($nhil, 2, '.', ',').'</td>
</tr>
';
}



//GETFUNDS 
$getfunds = '';
if($getfund){ 
$getfunds = '
<tr>
<td style="width: 310px;"></td>
<td style="width: 120px;">GETFUND ('.$getfundx.'%)</td>
<td style="width: 100px;">'.number_format($getfund, 2, '.', ',').'</td>
</tr>
';
}

//VAT
$vats = '';
if($vat){ 
$vats = '
<tr>
<td style="width: 310px;"></td>
<td style="width: 120px;">VAT ('.$vatx.'%)</td>
<td style="width: 100px;">'.number_format($vat, 2, '.', ',').'</td>
</tr>
';
}

//TRANSPORTATION
$transportations = '';
if($transportation){
$transportations = '
<tr>
<td style="width: 310px;"></td>
<td style="width: 120px;">Transportation '.$cur.'</td>
<td style="width: 100px;">'.number_format($transportation, 2, '.', ',').'</td>
</tr>
';
}

$installations = '';
if($installation){
$installations = '
<tr>
<td style="width: 310px;"></td>
<td style="width: 120px;">Installation '.$cur.'</td>
<td style="width: 100px;">'.number_format($installation, 2, '.', ',').'</td>
</tr>
';
}
 
$totals = '
<tr>
<td style="width: 310px;"></td>
<td style="width: 120px;">Total '.$cur.'</td>
<td style="width: 100px;">'.number_format($total, 2, '.', ',').'</td>
</tr>
';


$trans = '
<table>
'.$sub_total.'
'.$withholdingtaxs.'
'.$discounts.'
'.$nhils.'
'.$getfunds.'
'.$covids.'
'.$vats.'
'.$transportations.'
'.$installations.'
'.$totals.'
<style>
table{
    padding: 6px;
}
</style>
</table>
';
$pdf->writeHTMLCell(190,0,'','',$trans,'',1);


$sign = '
<table>
<tr>
<td style="width: 310px;"></td>
<td style="width: 120px;"></td>
<td style="width: 100px;">
<div>
'.$signature.'
<br />
</div>
Signature
</td>
</tr>
<style>
table{
    padding: 6px;
}
div{
    border-bottom: solid 1px black;
}
</style>
</table>
';

//$pdf->writeHTMLCell(190,0,'','',$sign,'',1);

$notes = '';
if($note){ 
$notes = '
<div>
<h4>NOTE</h4>
<p>
'.$note.'
</p>
</div>
';
}
$pdf->writeHTMLCell(190,0,'','',$notes,'',1);

$terms = '';
if($terms_conditions AND $trans_type === 'proforma'){
$terms = html_entity_decode($terms_conditions);
}
$pdf->writeHTMLCell(190,0,'','',$terms,'',1);


