const Spinner = (outputClass) => {
  return (document.querySelector(`.${outputClass}`).innerHTML = `
  <div class="spinner-wrapper">
	<i class="fa fa-spinner fa-spin"></i>
</div>
	`);
};

export default Spinner;
