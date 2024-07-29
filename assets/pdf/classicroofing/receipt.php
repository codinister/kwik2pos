<?php 

$signature = getSignature($signatures,$fullname,$width="80",$height="20", $actions);
$logo = getLogo($comp_logo,$width="110",$height="60", $actions);

$check_cash = $pay_type === 'Cash'? $check : '';
$check_cheque = $pay_type === 'Cheque'? $check : '';
$check_other = ($check_cash | $check_cheque)? '' : $check;


$header = '
<br /><br />
<table>
<tr>
<td style="width: 80px;">
</td>
<td style="width: 110px;">
'.$logo.'
</td>
<td style="width: 320px;">
<strong>'.$comp_name.'</strong>
<br />
<span>'.$comp_location.'</span>
<br>
<span>'.$comp_phone.'</span>
<br>
<span>'.$comp_email.'</span>
<br>
</td>
</tr>
</table>
<style>
strong{
    font-size: 17px;
}
table{
    text-align: center;
}
</style>
';

$br = '<br />';
$pdf->writeHTMLCell(190,0,'','',$br,'',1);
$pdf->writeHTMLCell(190,0,'','',$header,1,1);

$official = '<h3>Official Receipt</h3>';
$pdf->writeHTMLCell(190,0,'','',$official,0,1);


$lineone = '
<br /><br />
<table>
<tr>
<td style="width: 100px;">Date: '.date('d M Y',strtotime($rec_date)).'
</td>
<td style="width: 335px;"></td>
<td style="width: 110px;">
<span>No.</span> <strong style="border-bottom: solid 1px black;">'.$rec_no.'</strong>
</td>
</tr>
</table>

';
$pdf->writeHTMLCell(190,0,'','',$lineone,0,1);

$linetwo = '
<br />
<table>
<tr>
<td style="width: 140px;">Amount received from: </td>
<td style="width: 393px;border-bottom: solid 1px black;">
'.$cust_name.'
</td>
</tr>
</table>
';
$pdf->writeHTMLCell(190,0,'','',$linetwo,0,1);



$linethree = '
<table>
<tr>
<td style="width: 70px;">Address: </td>
<td style="width: 463px;border-bottom: solid 1px black;">
'.$cust_location.'
</td>
</tr>
</table>
';
$pdf->writeHTMLCell(190,0,'','',$linethree,0,1);

$linefour = '
<table>
<tr>
<td style="width: 90px;">Amount '.$cur.': </td>
<td style="width: 443px;border-bottom: solid 1px black;">
'.number_format($payment, 2, '.', ',').'
</td>
</tr>
<tr>
<td style="width: 90px;">Amount in words </td>
<td style="width: 443px;border-bottom: solid 1px black;">
'.$obj->words.'
</td>
</tr>
</table>
';
$pdf->writeHTMLCell(190,0,'','',$linefour,0,1);

if($balance > 0){
    $payment_purpose = 'PART PAYMENT FOR '.$profile;
}
else{
    $payment_purpose = 'FULL PAYMENT FOR '.$profile;
}

$linefive = '
<table>
<tr>
<td style="width: 130px;">Purpose of payment: </td>
<td style="width: 403px;border-bottom: solid 1px black;">
'.$payment_purpose.'
</td>
</tr>
</table>
';
$pdf->writeHTMLCell(190,0,'','',$linefive,0,1);


if($balance < 0){
    $balance_text = 'Change:';
    $balance_amount = getAllPayments($tax_id) - $total;
}
elseif($balance > 0){
    $balance_text = 'Balance due:';
    $balance_amount =  $total - getPreviousPayment($pay_id,$tax_id);
}
else{
    $balance_text = false;
}

$linesix = '
<br /><br />
<table>
<tr>
<td style="width: 200px;">
    <table style="border: solid 1px black; padding: 2px;">
        <tr>
        <td style="text-align: center;">ACCOUNT</td>
        </tr>

        <tr>
            <td style="width: 96px; border-top: solid 1px black;border-right: solid 1px black;">
            Total Amount
            </td> 
            <td style="width: 96px; border-top: solid 1px black">
            '.$cur.' '.number_format($total, 2, '.', ',').'
            </td>
        </tr>

        <tr>
        <td style="border-top: solid 1px black;border-right: solid 1px black;">
            Amount Paid
            </td> 
            <td style="border-top: solid 1px black">
            '.$cur.' '.number_format($payment, 2, '.', ',').'
            </td>
        </tr>

        <tr>
            <td style="border-top: solid 1px black;border-right: solid 1px black;">
            '.$balance_text.'
            </td> 
            <td style="border-top: solid 1px black">
            '.$cur.' '.number_format($balance_amount, 2, '.', ',').'
            </td>
        </tr>
    </table>
</td>
<td style="width: 130px;"></td>
<td style="width: 200px;">
    <table style="border: solid 1px black;  padding: 2px;">
    <tr>
    <td style="text-align: center;">Payment made by:</td>
    </tr>

    <tr>
        <td style="width: 96px; border-top: solid 1px black;border-right: solid 1px black;">
        Cash
        </td> 
        <td style="width: 96px; border-top: solid 1px black">
        '.$check_cash.'
        </td>
    </tr>

    <tr>
    <td style="border-top: solid 1px black;border-right: solid 1px black;">
        Cheque
        </td> 
        <td style="border-top: solid 1px black">
        '.$check_cheque.'
        </td>
    </tr>

    <tr>
        <td style="border-top: solid 1px black;border-right: solid 1px black;">
        Other
        </td> 
        <td style="border-top: solid 1px black">
        '.$check_other.'
        </td>
    </tr>
    </table>
</td>
</tr>
</table>
';
$pdf->writeHTMLCell(190,0,'','',$linesix,0,1);

$lineseven = '
<br />
<br />

<table style="text-align: center;">
<tr>
<td>
'.$fullname.'
<div style="border-top: solid 1px black;">Received by</div>
</td>
<td>

</td>
<td>
'.$signature.'

<div>Authorized signature</div>
</td>
</tr>
</table>
';


$pdf->writeHTMLCell(190,0,'','',$lineseven,0,1);

$pdf->Output();
