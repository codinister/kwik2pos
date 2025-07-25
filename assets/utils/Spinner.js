
import innerHTML from './innerHTML.js'
const Spinner = (outputClass) => {
  return innerHTML({
    classname: outputClass,
    content: `
  <div class="spinner-wrapper">
	<i class="fa fa-spinner fa-spin"></i>
</div>
	`,
  });
};

export default Spinner;
