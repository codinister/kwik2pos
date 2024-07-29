import { classSelector } from '../../utils/Selectors.js';
import Table from '../../utils/Table.js';
import { dmy, formatDate, ymd } from '../../utils/DateFormats.js';
import displayToast from '../../utils/displayToast.js';
import deleteAccessControl from './deleteAccessControl.js';
import sendReceiptWhatsapp from '../../sales/utils/customers/sendReceiptWhatsapp.js'




const getReceipts = async (allreceipts, cust_id) => {
  if (allreceipts) {

    let receipts = allreceipts
    const arr = JSON.parse(localStorage.getItem('deletedreceipt'));
    if(arr){
       receipts = allreceipts.filter((v) => !arr.includes(v.pay_id));
    }


    //RECEIPT DATA
    const data = Object.values(
      receipts
        .filter((v) => v.cust_id === cust_id)
        .reduce((a, b) => {
          if (a[b.pay_id]) {
            a[b.pay_id].pay_id = b.pay_id;
          } else {
            a[b.pay_id] = b;
          }
          return a;
        }, {})
    );



    document.addEventListener('change', (e) => {
      if (e.target.matches('.edit-receipt-inpt')) {
        const { name, value, id } = e.target;
        const getreceipts = JSON.parse(localStorage.getItem('editreceipts'));
        const obj = { ...getreceipts, pay_id: id, [name]: value };
        localStorage.setItem('editreceipts', JSON.stringify(obj));
      }
    });

    document.addEventListener('click', (e) => {

      if (e.target.matches('.whatsapp-receipt')) {
        sendReceiptWhatsapp(e);
      }

      if (e.target.matches('.save-receipt-btn')) {
        e.stopImmediatePropagation();
        const fd = new FormData();
        const { pay_id, payment, receipt_date } = JSON.parse(
          localStorage.getItem('editreceipts')
        );

        fd.append(
          'data',
          JSON.stringify({
            pay_id,
            payment,
            receipt_date,
            fullname: data[0]?.fullname,
          })
        );
        fetch(`router.php?controller=sales&task=update_payment_history`, {
          method: 'Post',
          body: fd,
        })
          .then((resp) => resp.text())
          .then((data) => {
            displayToast('lightgreen', data);
            localStorage.removeItem('editreceipts');

            classSelector(`addsavebtn${pay_id}`).innerHTML = `
            <a href="javascript:void(0);">
            ${deleteAccessControl(
              `<i class="fa fa-pencil editpay" 
            data-amnt="${payment}" 
            data-pay_id="${pay_id}"
            data-date="${receipt_date}"></i>`
            )}
            </a>
            <a href="javascript:void(0);">
            ${deleteAccessControl(
              `<i class="fa fa-trash deletepay" data-pay_id="${pay_id}"></i>`
            )}
            </a>
            `;
            classSelector(`editreceiptdate${pay_id}`).innerHTML =
              dmy(receipt_date);
            classSelector(`editamount${pay_id}`).innerHTML = payment;
          });
      }

      if (e.target.matches('.deletepay')) {
        e.stopImmediatePropagation();
        const { pay_id } = e.target.dataset;
        if (confirm('Are you sure you want to delete!')) {
          e.target.parentElement.parentElement.parentElement.remove();
          fetch(
            `router.php?controller=sales&task=delete_payment&pay_id=${pay_id}`
          )
            .then((resp) => resp.text())
            .then((data) => {
              if (!localStorage.getItem('deletedreceipt')) {
                localStorage.setItem('deletedreceipt', JSON.stringify([]));
              }
              const arr = JSON.parse(localStorage.getItem('deletedreceipt'));
              const newarr = [...arr, pay_id];
              localStorage.setItem('deletedreceipt', JSON.stringify(newarr));
            });
        } else {
        }
      }

      if (e.target.matches('.viewthisreceipt')) {
        e.stopImmediatePropagation();
        const { pay_id } = e.target.dataset;
        window.location = `assets/pdf/receipt.php?rec=${btoa(pay_id)}`;
      }

      if (e.target.matches('.editpay')) {
        e.stopImmediatePropagation();

        if (localStorage.getItem('editreceipts')) return;

        const { amnt, date, pay_id } = e.target.dataset;

        if (!localStorage.getItem('editreceipts')) {
          localStorage.setItem(
            'editreceipts',
            JSON.stringify({
              pay_id,
              payment: amnt,
              receipt_date: date,
            })
          );
        }

        if (window.screen.width < 400) {
          classSelector(`prof${pay_id}`).innerHTML = `
          <input type="text"  name="payment" class="edit-receipt-inpt" value="${amnt}" />
          <input type="date" name="receipt_date" class="edit-receipt-inpt recpt-inpt-date${pay_id}"/>
          `;
        } else {
          classSelector(`editamount${pay_id}`).innerHTML = `
          <input type="text" id="${pay_id}" name="payment" class="edit-receipt-inpt" value="${amnt}" />
          `;
          classSelector(`editreceiptdate${pay_id}`).innerHTML = `
          <input type="date" id="${pay_id}" name="receipt_date" class="edit-receipt-inpt recpt-inpt-date${pay_id}"/>
          `;
        }

        classSelector(`addsavebtn${pay_id}`).innerHTML = `
        <a href="javascript:void(0);"  class="save-receipt-btn">SAVE</a>
        `;

        setTimeout(() => {
          classSelector(`recpt-inpt-date${pay_id}`).valueAsDate = new Date(
            ymd(date)
          );
        }, 0);
      }
    });

    const tableBodyList = data
      .map((v) => {
        return `
      <ul class="receipt-table">   
      <li>
      <a href="javascript:void(0);" 
      data-cust_id = "${v.cust_id}" 
      data-tax_id = "${v.tax_id}" 
      data-user_id = "${v.user_id}" 
      data-pay_id = "${v.pay_id}" 
      class="viewthisreceipt prof${v.pay_id}">
      ${v.profile}
      </a>
      </li>
      <li>
        <div 
        data-pay_id="${v.pay_id}" 
        class="edit-payment editamount${v.pay_id}">
        ${v.payment}
        </div>
      </li>
      <li>
        <div
        data-pay_id="${v.pay_id}" 
        class="edit-payment-date editreceiptdate${v.pay_id}"
        >
        ${formatDate(v.createdAt)}
        </div>
      </li>
      <li class="salesicons addsavebtn${v.pay_id}">


        <a href="javascript:void(0);">
            ${deleteAccessControl(
              `<i class="fa fa-pencil editpay" 
              data-amnt="${v.payment}" 
              data-pay_id="${v.pay_id}"
              data-date="${v.createdAt}"></i>
              `
            )}
        </a>
        <a href="javascript:void(0);"     class="whatsapp-small">
            <img 
              class="whatsapp-receipt"
              data-pay_id = ${v.pay_id}
              data-cust_name = ${v.fullname}
              data-phone = ${v.phone}
              src="assets/images/whatsapp.jpg" alt="whatsapp" 
            />
        </a>
        <a href="javascript:void(0);">
          ${deleteAccessControl(
            `<i class="fa fa-trash deletepay" data-pay_id="${v.pay_id}"></i>`
          )}
        </a>



      </li>
      </ul>
    `;
      })
      .join('');

    classSelector('receipts').innerHTML = `
      ${Table(
        `<ul class="receipt-table">   
        <li>Profile</li>
        <li>Payment</li>
        <li>Date</li>
        <li>Action</li>
        </ul>`,
        `${tableBodyList}`,
        'receiptTableBodyClass'
      )}
  `;
  }
};

export default getReceipts;
