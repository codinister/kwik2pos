<?php 


define("MAJOR", 'Ghana Cedis');
define("MINOR", 'Pesewas');

class toWords
{
    var $pounds;
    var $pence;
    var $major;
    var $minor;
    var $words = '';
    var $number;
    var $magind;
    var $units = array('', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine');
    var $teens = array('Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen');
    var $tens = array('', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety');
    var $mag = array('', 'Thousand', 'Million', 'Billion', 'Trillion');

  
    



    function __construct($amount, $major = MAJOR, $minor = MINOR)
    {
        $this->__toWords__((int)($amount), $major);

        $whole_number_part = $this->words;

        $strform = number_format($amount, 2);

        $right_of_decimal = (int)substr($strform, strpos($strform,'.')+1);
        
        $this->__toWords__($right_of_decimal, $minor);

        $this->words = $whole_number_part . ' ' . $this->words;
    }
    



    
    

    function __toWords__($amount, $major)
    {

        $this->major  = $major;
        $this->number = number_format($amount, 2);
        list($this->pounds, $this->pence) = explode('.', $this->number);
        $this->words = " $this->major";

        if ($this->pounds == 0){
            $this->words = "Zero $this->words";
        }
        else {
            $groups = explode(',', $this->pounds);
            $groups = array_reverse($groups);
            for ($this->magind = 0; $this->magind < count($groups); $this->magind++) {
                if (($this->magind == 1) && (strpos($this->words, 'hundred') === false) && ($groups[0] != '000'))
                    $this->words = ' and ' . $this->words;
                $this->words = $this->_build($groups[$this->magind]) . $this->words;
            }
        }
    }
    





    function _build($n)
    {
        $res = '';

        $na  = str_pad("$n", 3, "0", STR_PAD_LEFT);

        if ($na == '000') return '';

        if ($na[0] != 0) $res = ' ' . $this->units[$na[0]] . ' hundred';

        if (($na[1] == '0') && ($na[2] == '0')) return $res . ' ' . $this->mag[$this->magind];


        $res .= $res == '' ? '' : ' and';

        $t = (int) $na[1];

        $u = (int) $na[2];

        switch ($t) {
            case 0:
                $res .= ' ' . $this->units[$u];
                break;
            case 1:
                $res .= ' ' . $this->teens[$u];
                break;
            default:
                $res .= ' ' . $this->tens[$t] . ' ' . $this->units[$u];
                break;
        }
        $res .= ' ' . $this->mag[$this->magind];

        return $res;
    }






    
}



$obj = new toWords(0.5); 


//echo $obj->words;


$groups = explode(',', '1,000');
$groups = array_reverse($groups);

print_r($groups);



