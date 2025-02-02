import format_number from '../../utils/format_number.js'
import Header from './Header.js'

const statements = (obj) => {


    const {
        settings: {currency},
        invoices,
        receipts,
        total_receipts,
        total_invoices,
        balance,
        fullname
    } = obj

//invoices INVOICES  


const invoicesInvoices = invoices.map(v => {
    return `
        <tr>

        <td style="
        width: 13.8rem; 
        padding: .5rem;
        border-bottom: solid .1rem #444; 
        border-left: solid .1rem #444;
        border-right: solid .1rem #444;">
        ${v.createdAt}
        </td>

        <td style="
        width: 12rem; 
        padding: .5rem;
        border-bottom: solid .1rem #444; 
        border-right: solid .1rem #444;">
        ${v.invoice_no}
        </td>

        <td style="
        width: 30rem; 
        padding: .5rem;
        border-bottom: solid .1rem #444; 
        border-right: solid .1rem #444;">
        ${v.profile}
        </td>

        <td style="
        width: 13.8rem; 
        padding: .5rem;
        border-bottom: solid .1rem #444; 
        border-right: solid .1rem #444;">
        ${format_number(v.total)}
        </td>

        </tr>
        `
}).join(' ')


const receipt = receipts.map(v => {

return `
    <tr>

    <td style="
    width: 13.8rem; 
    padding: .5rem;
    border-bottom: solid .1rem #444; 
    border-left: solid .1rem #444;
    border-right: solid .1rem #444;">
    ${v.rec_date}
    </td>

    <td style="
    width: 12rem; 
    padding: .5rem;
    border-bottom: solid .1rem #444; 
    border-right: solid .1rem #444;">
    ${v.receipt_no}
    </td>

    <td style="width: 19.8rem; 
    border-bottom: solid .1rem #444; 
    padding: .5rem;
    border-right: solid .1rem #444;">
    ${v.profile}
    </td>



    <td style="
    width: 10.8rem; 
    padding: .5rem;
    border-bottom: solid .1rem #444; 
    border-right: solid .1rem #444;"> 
    ${v.invoice_no}
    </td>

    <td style="
    width: 10.8rem; 
    padding: .5rem;
    border-bottom: solid .1rem #444; 
    border-right: solid .1rem #444;"> 
    ${v.payment}
    </td>

    </tr>
`

}).join(' ')



return `
  <div class="invwrapper">
    ${Header(obj)} 
    <br />
    <br />
    <br />
    
    <table style="width: 70rem;" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td>
            <h2>${fullname}'s ACCOUNT STATEMENT</h2>
            <br />
            </td> 
        </tr>
        <tr>
            <td>
                <table cellspacing="0">
                    <thead>
                        <tr>
                            <td>
                            <h4>INVOICES</h4>
                            <hr />
                            <br />
                            </td>
                        </tr>


                        <tr>

                        <td style="
                        width: 13.8rem; 
                        background-color: #444;
                        color: white;
                        padding: .5rem;
                        border-top: solid .1rem #444; 
                        border-bottom: solid .1rem #444; 
                        border-right: solid .1rem #444;
                        border-left: solid .1rem #444;
                        ">
                        DATE
                        </td>

                        <td style="
                        background-color: #444;
                        color: white;
                        width: 12rem; 
                        padding: .5rem;
                        border-top: solid .1rem #444; 
                        border-bottom: solid .1rem #444; 
                        border-right: solid .1rem #444;">
                        INVOICE #
                        </td>

                        <td style="
                        width: 30rem; 
                        background-color: #444;
                        color: white;
                        padding: .5rem;
                        border-top: solid .1rem #444; 
                        border-bottom: solid .1rem #444; 
                        border-right: solid .1rem #444;">
                        DESCRIPTION
                        </td>

                        <td style="
                        width: 13.8rem 
                        background-color: #444;
                        color: white;
                        padding: .5rem;
                        border-top: solid .1rem #444; 
                        border-bottom: solid .1rem #444; 
                        border-right: solid .1rem #444;">
                        AMOUNT
                        </td>

                        </tr>
            </thead>

            <tbody>
            ${invoicesInvoices}
            </tbody>

            <tbody>
                <table cellpadding="0">
                    <tbody>

                        <tr>

                        <td style="
                        width: 13.8rem; 
                        ">
                        </td>

                        <td style="
                        width: 12rem; 
                        padding: .5rem;"></td>

                        <td style="
                        width: 30rem; 
                        text-align: right;
                        padding-right: 1.3rem;
                        ">
                        TOTAL  ${currency}
                        </td>

                        <td style="
                        padding: .5rem;
                        width: 13.8rem">
                        ${format_number(total_invoices)}
                        </td>

                        </tr>


                    
                    </tbody>
                </table>
            </tbody>
            </table>

            <br />
            <br />
            <br />
            <br />
            
        
 


            <table cellpadding="0" cellspacing="0" border="0" style="width: 70rem;">
            <thead>
                <tr>
                <h4 style="border-bottom: solid .1rem #444;width: 20rem;">RECEIPTS</h4>
            
                <br />
                </tr>


                <tr>
                <td style="
                width: 13.8rem; 
                padding: .5rem;
                border-top: solid .1rem #444; 
                background-color: #444;
                color: white;
                border-bottom: solid .1rem #444; 
                border-left: solid .1rem #444;
                border-right: solid .1rem #444;">
                DATE
                </td>

                <td style="
                width: 12rem; 
                padding: .5rem;
                border-top: solid .1rem #444; 
                background-color: #444;
                color: white;
                border-bottom: solid .1rem #444; 
                border-right: solid .1rem #444;">
                RECIEPT #
                </td>

                <td style="width: 19.8rem; 
                border-bottom: solid .1rem #444; 
                padding: .5rem;
                border-top: solid .1rem #444; 
                background-color: #444;
                color: white;
                border-right: solid .1rem #444;">
                DESCRIPTION
                </td>

                <td style="
                width: 10.8rem; 
                padding: .5rem;
                border-top: solid .1rem #444; 
                background-color: #444;
                color: white;
                border-bottom: solid .1rem #444; 
                border-right: solid .1rem #444;"> 
                INVOICE #
                </td>

                <td style="
                width: 10.8rem; 
                padding: .5rem;
                border-top: solid .1rem #444; 
                background-color: #444;
                color: white;
                border-bottom: solid .1rem #444; 
                border-right: solid .1rem #444;"> 
                PAYMENT
                </td>

    
                </tr>



            </thead>
            <tbody>
            ${receipt}
            </tbody>
            </table>


         </td>
        </tr>
        </tbody>
        </table>



        <table cellpadding="0">

            <tr>

                <td style="
                width: 13.8rem; 
                padding: .5rem;
                ">
                </td>

                <td style="
                width: 12rem; 
                padding: .5rem;
                ">
     
                </td>

                <td style="width: 13.8rem; 
                padding: .5rem;
                ">
        
                </td>

                <td style="
                width: 18.5rem; 
                text-align: right;
                padding: .5rem;
                "> 
                TOTAL ${currency}
                </td>

                <td style="
                width: 13.8rem; 
                padding: .5rem;
               "> 
                ${format_number(total_receipts)}
                </td>

            </tr>
    
        </table>




        <br />
        <br />
        <br />
        <br />
        <br />

    


        <table cellpadding="0" style="width: 70rem;">

            <tr>

                <td style="
                width: 13.8rem; 
                padding: .5rem;
                ">
                </td>

                <td style="
                width: 12rem; 
                padding: .5rem;
                ">
     
                </td>

                <td style="width: 13.8rem; 
                padding: .5rem;
                ">
        
                </td>

                <td style="
                width: 20rem; 
                text-align: right;
                padding: .5rem;
                "> 
                AMOUNT DUE ${currency}
                </td>

                <td style="
                width: 10.8rem; 
                padding: .5rem;
               "> 
                ${format_number(balance)}
                </td>

            </tr>
    
        </table>
        <br />
        <br />
        <br />
        <br />



</div>

`
 

}

export default statements