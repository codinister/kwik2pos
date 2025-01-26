import format_number from '../../utils/format_number.js'
import {dmy} from '../../utils/DateFormats.js'
import inv_num from '../../utils/inv_num.js'

const statements = ({...obj}) => {

    const {
        settings,
        payments, 
        sales
    } = obj

 


//SALES INVOICES  
const salesInvoices = sales.map(v => {
    return `
        <tr>
        <td style="width: 138px; border-bottom: solid 1px black; border-right: solid 1px black;">
        ${ymd(v.date)}
        </td>
        <td style="width: 120px; border-bottom: solid 1px black; border-right: solid 1px black;">
        ${inv_num(comp_name,v.tax_id)}
        </td>
        <td style="width: 138px; border-bottom: solid 1px black; border-right: solid 1px black;">
        ${v.profile}
        </td>
        <td style="width: 138px; border-bottom: solid 1px black; border-right: solid 1px black;">'.$currency.' 
        ${format_number(total)}
        </td>
        </tr>
        `
}).join(' ')





const receipts = payments.map(v => {

return `
    <tr>

    <td style="width: 138px; border-bottom: solid 1px black; border-right: solid 1px black;">
    ${dmy(v.date)}
    </td>

    <td style="width: 120px; border-bottom: solid 1px black; border-right: solid 1px black;">
    ${v.rec_no}
    </td>

    <td style="width: 138px; border-bottom: solid 1px black; border-right: solid 1px black;">
    ${v.profile}
    </td>

    <td style="width: 138px; border-bottom: solid 1px black; border-right: solid 1px black;">'.$currency.' 
    ${v.payment}
    </td>
    </tr>
`

}).join(' ')



return `
    ${header(obj)} 
    
    <table style="width: 70rem;">
        <tr>
        <td>
        <h2>${fullname}'s ACCOUNT STATEMENT</h2>
        </td> 
        </tr>
        <tr>
        <td>
            <table>
            <thead>
                <tr>
                    <td>
                    <h4>SALES INVOICES</h4>
                    </td>
                </tr>
                <tr>
                    <td style="width: 138px;">DATE</td>
                    <td style="width: 120px;">INVOICE #</td>
                    <td style="width: 138px;">INVOICE DESC.</td>
                    <td style="width: 138px;">AMOUNT</td>
                </tr>
            </thead>

            <tbody>
            ${salesInvoices}
            </tbody>


            <tbody>
                <table>
                    <tr>
                        <td style="width: 138px;"></td>
                        <td style="width: 120px; text-align: right">
                        </td>
                        <td style="width: 138px; text-align: right">TOTAL:</td>
                        <td style="width: 138px; border-bottom: solid 1px black; border-left: solid 1px black">
                        ${currency}  ${grand_total}
                        </td>
                    </tr>
                </table>
            </tbody>
            </table>



            <table>
            <thead>
                <tr>
                <h4>RECEIPTS</h4>
                </tr>
                <tr>
                <td style="width: 138px;">DATE</td>
                <td style="width: 120px;">RECEIPT #</td>
                <td style="width: 138px;">RECEIPT DESC.</td>
                <td style="width: 138px;">AMOUNT</td>
                </tr>
            </thead>
            <tbody>
            ${receipts}
            </tbody>
            </table>


         </td>
        </tr>
        </tbody>
        </table>



        <table>
        <tr>
        <td style="width: 138px;"></td>
        <td style="width: 120px; text-align: right"></td>
        <td style="width: 138px; text-align: right">TOTAL:</td>
        <td style="width: 138px; border-bottom: solid 1px black; border-left: solid 1px black">'.$currency.' '.number_format($payment_grand_total, 2, '.', ',').'</td>
        </tr>
        </table>






        <table>
        <tr>
        <td style="width: 138px;"></td>
        <td style="width: 120px; text-align: right"></td>
        <td style="width: 138px; text-align: right">AMOUNT DUE:</td>
        <td style="width: 138px;">${currency}  ${format_number(remaining_balance)}</td>
        </tr>
        </table>





`
 

}

export default statements