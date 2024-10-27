const tableFooter = ({ ...obj }) => {
  const {
    settings: { comp_phone },
  } = obj;

  return `

  <table cellpadding="0" style="background-color: #514b4d; color: white;">  
    <tbody>

      <tr>  

        <td style="border-right: solid 0.1rem white; width: 100px; padding: 1.6rem;">
          YOUR
          <br />
          <span style="color: #fbb313;">ADVERTISING</span>
          <br />
          SOLUTION
        </td>

        <td style="border-right: solid 0.1rem white; width: 18rem; padding-right: 1rem; ">
          <table>
          <tr>

          <td style="width: 33px; padding-inline: 1rem;"> 
          <img src="images/spagency/telephone.jpg" alt="" width="22" height="22" /> 
          </td>

          <td>  
          CALL US
          </td>

          </tr>
          </table>
        </td>

        <td style="border-right: solid 0.1rem white; width: 17rem; padding-right: 1rem;">
          <table>
            <tr>

            <td style="width: 3.3rem; padding-inline: 1rem;"> 
            <img src="images/spagency/envelope.jpg" alt="" width="20" height="18" />
            </td>

            <td>  
            PRIVATE
            MAIL
            </td>

            </tr>
          </table>
        </td>

        <td style="width: 20rem; padding-right: 1rem;">
          <table>
          <tr>
          <td style="width: 3.3rem; padding-inline: 1rem;"> 
          <img src="images/spagency/mobile.jpg" alt="" width="16" height="27" />
          </td>
          <td>  
          ${comp_phone}
          </td>
          </tr>
          </table>
        </td>

      </tr>
    
      <tr>
        <td  style="background-color: #4d4c52; height: 2px; width: 100px;"></td>
        <td  style="background-color: #fbb313; height: 2px;  width: 13rem;"></td>
        <td  style="background-color: #fbb313; height: 2px;  width: 15rem;"></td>
        <td  style="background-color: #fbb313; height: 2px;  width: 15rem;"></td>
      </tr>

    </tbody>
  </table>
`;
};

export default tableFooter;
