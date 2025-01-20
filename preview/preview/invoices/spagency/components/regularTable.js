import format_number from '../../../../utils/format_number.js';

const regularTable = ({ ...obj }) => {
  const {
    settings: { duration },
    items,
    durations
  } = obj;

  const duration_count = durations

  let rows = '';

  if (duration_count === 0) {
    let num = '';
    rows = Object.values(items)
      .map((v, k) => {
        num = k + 1;

        if (v.qty > 0) {
          const dur =
            v.duration.length > 0 ? v.duration + `${duration}(s)` : '';

          return `
            <tr>
              <td 
              style="
              width: 3rem; 
              border-right: 
              solid 0.1rem black; 
              padding: 0.5rem;
              border-left: solid 0.1rem black;
              border-bottom: solid 0.1rem black;
              ">${num}</td>

              <td 
              style="
              width: 5rem; 
              border-right: 
              solid 0.1rem black;  
                   padding: 0.5rem;
              border-bottom: solid 0.1rem black;
              ">${v.qty}</td>

              <td 
              style="
              width: 33.5rem; 
              border-right: 
              solid 0.1rem black;  
              padding: 0.5rem;
              border-bottom: solid 0.1rem black;
              ">${v.prod_name}</td>

              <td 
              style="
              width: 10rem; 
              padding: 0.5rem;
              border-right: solid 0.1rem #666666; 
              border-bottom: solid 0.1rem #666666;
              ">${v.prod_size ? v.prod_size : ''}</td>

              <td 
              style="
              width: 10rem; 
              border-right: solid 0.1rem black;  
              border-bottom: solid 0.1rem black;
              padding: 0.5rem;
              ">${v.unit_price}</td>

              <td 
              style="
              width: 8.5rem; 
              border-right: solid 0.1rem black;  
              border-bottom: solid 0.1rem black;
              padding: 0.5rem;
              "
              >${format_number(v.total)}</td>

              </tr>
                  `;
        }
      })
      .join(' ');

    return `
          
          <table cellspacing="0" cellpadding="0" >
            <thead   style="background: #666666; color: #ffffff;">
                <tr>
                    <td 
                    style="
                    width: 3rem; 
                    border-left: solid .1rem #666666; 
                    border-top: solid .1rem #666666; 
                    border-bottom: solid .1rem #666666; 
                    padding: 0.5rem;
                    "
                    >#</td>
    
                    <td
                    style="
                    width: 5rem; 
                    border-left: solid 0.1rem #666666; 
                    border-top: solid 0.1rem #666666; 
                    border-bottom: solid 0.1rem #666666; 
                    padding: 0.5rem;
                    ">Qty</td>
    
                    <td 
                    style="
                    width: 33.5rem; 
                    border-left: solid 0.1rem #666666; 
                    border-top: solid 0.1rem #666666; 
                    border-bottom: solid 0.1rem #666666; 
                    padding: 0.5rem;
                    ">Description</td>
                    
    
                    <td 
                    style="
                    width: 10rem; 
                    border-left: solid 0.1rem #666666; 
                    border-top: solid 0.1rem #666666; 
                    border-bottom: solid 0.1rem #666666; 
                    padding: 0.5rem;
                    ">Size</td>
        
                    <td           
                    style="
                    width: 10rem; 
                    border-left: solid 0.1rem #666666; 
                    border-top: solid 0.1rem #666666; 
                    border-bottom: solid 0.1rem #666666; 
                    padding: 0.5rem;
                    ">Unit Price</td>
    
                    <td           
                    style="
                    width: 8.5rem; 
                    border-left: solid 0.1rem #666666; 
                    border-right: solid 0.1rem #666666; 
                    border-top: solid 0.1rem #666666; 
                    border-bottom: solid 0.1rem #666666; 
                    padding: 0.5rem;
                    ">Total</td>
    
                </tr>
                </thead>
    
                <tbody>${rows}</tbody>
            </table>
          `;
  } else {
    return '';
  }
};

export default regularTable;
