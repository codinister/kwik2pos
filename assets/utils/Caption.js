const Caption = ({...options}) => {
  const {text,title} = options 
  return `
  <div class="caption">
  <span>${title}</spam>
    <i class="fa fa-question-circle-o question-box">
      <div>
        ${text}
      </div>
    </i>
  </div>`;
};

export default Caption;
