const Lists = (v) => {
  const btns = `
	<i class="fa fa-edit edit-record ${v.editclass}" title="EDIT"   data-id="${v.id}" ></i>
	<i class="fa fa-trash delete-record ${v.deltclass}" title="DELETE"  data-id="${v.id}" ></i>`;

  const adminbtns = `
	<i class="fa fa-lock   text-muted"></i>
	<i class="fa fa-lock text-muted"></i>`;

  	return `<div class="list-box">
		<div>
			<a href="javascript:void(0);" data-id="${v.id}" class="${v.fnameclass}">
			${v.name}
			</a>
		</div>
		<div>
			${v.role_id == 111 ? adminbtns : btns}
		</div>
	</div>`;
};

export default Lists;
