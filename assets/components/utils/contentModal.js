window.addEventListener('click', (e) => {
  if (e.target.matches('.contentmodal')) {
    e.target.classList.remove('show');
    document.body.style.overflow = 'scroll';
    //window.location.reload()
  }
});

 

const contentModal = (title = '', body = 'BODY AREA') => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.close-contentmodal')) {
      const par = e.target.parentElement.parentElement.parentElement;
      par.classList.remove('show');
      document.body.style.overflow = 'scroll';
      //window.location.reload()
    }
  });

  return `
    <div class="contentmodal">
    
        <div class="modal-inner">
            <div class="modal-top">
                <h1 class="modal-heading">${title}</h1> 
                <a href="javascript:void(0);" class="close-contentmodal modalcloseicon">&times;</a>
            </div>
            <div class="modal-body contentroot">
                ${body}
            </div> 
        </div>
    </div>
    `;
};

export default contentModal
