import displayToast from '../../utils/displayToast.js';

const taxesValidation = () => {
  const taxes = JSON.parse(localStorage.getItem('taxes'));
  //Validate Cheque description

  if (taxes) {
    if (taxes?.pay_type === 'Cheque') {
      if (!taxes?.bank_acc_number) {
        return displayToast('bgdanger', 'Cheque number field required!');
      }
    }
    return taxes;
  } else {
    return [];
  }
};

export default taxesValidation;
