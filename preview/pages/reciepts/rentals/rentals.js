import Header from "./components/Header.js";
import Body from "./components/Body.js";
import Footer from "./components/Footer.js";

const rentals = ({ ...obj }) => {
  return `
  <div class="invwrapper" style="width: max-content">
    ${Header(obj)}
    ${Body(obj)}
    ${Footer(obj)}
    </div>
    `;
};

export default rentals;
