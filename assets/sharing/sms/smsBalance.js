const smsBalance = (output) => {
  const sett = JSON.parse(sessionStorage.getItem('sinpt'));

  const key = sett?.sms_api_key;

  fetch(`https://apps.mnotify.net/smsapi/balance?key=${key}`)
    .then((resp) => resp.json())
    .then((data) => {
      if(data){
        document.querySelector(`.${output}`).innerHTML = data?.sms_balance;
      }
      else{
        document.querySelector(`.${output}`).innerHTML = 0
      }

    })
    .catch(err =>{
      console.log(err)

    })
};

export default smsBalance;
