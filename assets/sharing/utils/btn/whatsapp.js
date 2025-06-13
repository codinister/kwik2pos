import sendWhatsapp from "../../data/api/sendWhatsapp.js"


const whatsapp = (obj) => {


    document.addEventListener('click', e => {

        if(e.target.matches('.whatsp-btn')){
            const msg = [
                `Hello ${obj?.cust_name}`,
                `Click on the link below to view your ${obj?.type}`,
                obj?.url,
              ].join('\n\n')
            sendWhatsapp(obj?.cust_phone, msg)
        }


    })

    if(obj?.cust_phone.length > 0){
    return `
    <div class="whats-wrapper">
    <i class="fa fa-whatsapp fa-lg whatsp-btn" title="Whatsapp ${obj?.cust_phone}"></i>
    </div>
    `
    }
    else{
        return ''
    }

}

export default whatsapp