const Totalbox = ({ ...options }) => {
  const { fa, title, amount } = options;
  return `
    <div class="totalbox">
    <div>
    <i class="fa fa-${fa}"></i>
    </div>
    <div>
    <strong>${title}</strong>
    <h5>${amount}</h5>
    </div>
    </div>
  `;
};

export default Totalbox;
