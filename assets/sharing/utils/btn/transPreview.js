

const transPreview = (pay_id,cust_id,tax_id,user_id) => {

    if(pay_id.length > 0){
        return `
        <button
       data-pay_id="${pay_id}"
        data-tax_id="${tax_id}"
        data-cust_id="${cust_id}"
        data-user_id="${user_id}"
        
        class="preview-reciept">View Receipt</button>
        `
    }
    else{
        return `
        <button 
        data-tax_id="${tax_id}"
        data-cust_id="${cust_id}"
        data-user_id="${user_id}"
        class="preview-invoice">View Invoice</button>
        `
    }

}

export default transPreview