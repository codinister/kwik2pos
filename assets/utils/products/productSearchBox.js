
const productSearchBox = (label,inputClass)=>{
  const obj = JSON.parse(sessionStorage.getItem('checkmark'));
  const search = obj?.search || '';
 return `<div class="input-animate prod-search-box-wrapper">	
  <input type="text" value="${search}"  placeholder=" " class=" ${inputClass}" required="true" >
  <label>${label}</label>
  </div>`
}

export default productSearchBox