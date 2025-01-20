const CEDIS = 'Ghana Cedis';
const PESEWAS = 'Pesewas';

class ToWords {

  constructor(amount, cedis = CEDIS, pesewas = PESEWAS) {

    this.arrvalue1 = '';
    this.arrvalue2 = '';
    this.cedisign = cedis;
    this.pesewasign = pesewas;
    this.words = '';
    this.decimalnumber = '';
    this.counter = 0;

    this.emptytonine = [
      '',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
    ];
    this.tentonineteen = [
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen',
    ];
    this.emptytoninety = [
      '',
      'Ten',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ];
    this.emptytotrillion = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

    this.toWords(Math.floor(amount), this.cedisign);
    const amountincedis = this.words;

    const convertamounttodecimal = amount.toFixed(2).toString();
    const amountinpesewas = parseInt(convertamounttodecimal.split('.')[1]);
    this.toWords(amountinpesewas, this.pesewasign);

    this.words = `${amountincedis} ${this.words}`;
  }

  toWords(amount, cedipesewasign) {
    this.cedisign = cedipesewasign;
    this.decimalnumber = amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    [this.arrvalue1, this.arrvalue2] = this.decimalnumber.split('.');
    this.words = ` ${this.cedisign}`;

    if (parseInt(this.arrvalue1) === 0) {
      this.words = `Zero ${this.words}`;
    } else {
      const reversedArrVal1 = this.arrvalue1.split(',').reverse();
      for (this.counter = 0; this.counter < reversedArrVal1.length; this.counter++) {
        if (
          this.counter === 1 &&
          !this.words.includes('hundred') &&
          reversedArrVal1[0] !== '000'
        ) {
          this.words = ` and ${this.words}`;
        }
        this.words = `${this.build(reversedArrVal1[this.counter])}
        ${this.words}`;
      }
    }
  }

  build(amnt) {
    let res = '';
    const amount = amnt.toString().padStart(3, '0');

    if (amount === '000') return '';

    if (amount[0] !== '0') {
      res = ` ${this.emptytonine[amount[0]]} hundred`;
    }

    if (amount[1] === '0' && amount[2] === '0') {
      return `${res} ${this.emptytotrillion[this.counter]}`;
    }

    res += res === '' ? '' : ' and';

    const amountVal1 = parseInt(amount[1]);
    const amountVal2 = parseInt(amount[2]);

    switch (amountVal1) {
      case 0:
        res += ` ${this.emptytonine[amountVal2]}`;
        break;
      case 1:
        res += ` ${this.tentonineteen[amountVal2]}`;
        break;
      default:
        res += ` ${this.emptytoninety[amountVal1]} ${this.emptytonine[amountVal2]}`;
        break;
    }

    res += ` ${this.emptytotrillion[this.counter]}`;
    return res;
  }
}

 const amountToWords = (n) => {
  
  const amountInWords = new ToWords(n);
 return amountInWords.words
};
export default amountToWords
