
const reportTitle = ({...options}) => {

  const {title,subtitle,desc} = options

  return `
      <div class="report-title"> 
      <h5>${title}</h5>
      <p>${subtitle}</p>
      <p>${desc}</p>
    </div>
  `
}

export default reportTitle