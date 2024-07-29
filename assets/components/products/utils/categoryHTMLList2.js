export const categoryHTMLList = (v, editClassName, deltClassName) => {
  return `<div class="list-box">
		<div>
			<a href="javascript:void(0);"  class="prodcats">
			<span class="prodbycat" data-id="${v.cat_id}">${v.cat_name}</span> <span>
			
			<i class="fa fa-lock"></i>
			
			</span>
			</a>
		</div>

	</div>`;
};

export default categoryHTMLList