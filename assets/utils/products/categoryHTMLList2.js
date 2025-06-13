export const categoryHTMLList = (v) => {
	const search = new URLSearchParams(window.location.search)
	const cat = search.get('c')
  return `<tr class="list-box">

		<td>
			<a href="javascript:void(0);"  class="prodcats ${cat === v.cat_id ? 'cat-active' : ''}">
			<span class="prodbycat" data-id="${v.cat_id}">${v.cat_name}</span> 
			</a>
		</td>

		<td>
		<span><i class="fa fa-lock"></i></span>
		</td>

	</tr>`;
};

export default categoryHTMLList