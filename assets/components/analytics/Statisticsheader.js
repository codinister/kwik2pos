
const Statisticsheader = ({...options}) => {
  const {title,subtitle,fa} = options
return `
      <div class="container  statisticsheader">
      <div>
      <i class="fa fa-${fa}"></i>
      </div>
        <div>
        <strong>${title}</strong>
        <p>${subtitle}</p>
        </div>
      </div>`
}

export default Statisticsheader