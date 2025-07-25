const Totalbox = (classname,title) => {
  return `
  <div class="total-box">
    <h5>${title}</h4>
    <h2 class="${classname}-total"></h2>
    <div class="hover-effect"></div>
    <div class="${classname}-date total-date"></div>
  </div>
  `;
};

export default Totalbox;
