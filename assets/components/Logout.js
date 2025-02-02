import Login from "./Login.js";
import { classSelector } from "./utils/Selectors.js";


const Logout = () => {

    localStorage.removeItem('sales');
    localStorage.removeItem('prodlocalstorage');
    localStorage.removeItem('userlocalstorage');
    localStorage.removeItem('prozdlist');
    localStorage.removeItem('zsdf');
    localStorage.removeItem('nuser');
    localStorage.removeItem('stocks');
    localStorage.removeItem('qtys');
    localStorage.removeItem('soldinv');
    localStorage.removeItem('newrec');
    localStorage.removeItem('filterby');
    localStorage.removeItem('contract');
    localStorage.removeItem('custinp');
    localStorage.removeItem('custinfo');
    localStorage.removeItem('deletedproformas');
    localStorage.removeItem('deletedinvoices');
    localStorage.removeItem('deletedreceipt');
    localStorage.removeItem('prodlocalstorage');
    localStorage.removeItem('userprofile');
    localStorage.removeItem('usernote');
    localStorage.removeItem('settingupdate');
    localStorage.removeItem('smsinpt');
  
    classSelector('root').innerHTML = Login();
  
}

export default Logout