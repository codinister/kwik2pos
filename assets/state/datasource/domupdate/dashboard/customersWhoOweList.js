const customersWhoOweList = (v) => {
  return `<tr> 
          <td>${v.fullname}</td>
          <td>${v.balance}</td>
          <td>${v.profile}</td>
        </tr>
        `;
};

export default customersWhoOweList;
