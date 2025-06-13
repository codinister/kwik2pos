import Body from "./components/Body.js";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";



const thermnal = ({...obj}) => {

    return `
    <div class="invwrapper">
      ${Header(obj)}
      ${Body(obj)}
      ${Footer(obj)}
    </div>
    `;

}

export default thermnal
