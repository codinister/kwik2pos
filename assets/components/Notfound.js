import {classSelector} from '../utils/Selectors.js'
const Notfound = () => {
  classSelector('display-page').innerHTML =`<h2>Page not found</h2>`
}

export default Notfound