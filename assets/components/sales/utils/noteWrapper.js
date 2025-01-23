import contractNote from "./contractNote.js";
import invoiceNote from "./invoiceNote.js";

const noteWrapper = () => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.adnte')) {
      const { value } = e.target;
      if (value === '1') {
        document.querySelector('.note-container').innerHTML = invoiceNote();
      }
      if (value === '2') {
        document.querySelector('.note-container').innerHTML = contractNote();
      }
    }
  });

  return `<div>
    <div>
    <input type="radio" value="1" name="note" class="adnte add-inv-note"> Add Note
    </div>
    <div>
    <input type="radio" value="2"  name="note" class="adnte add-cont-note"> Add Contract
    </div>
    </div>

    <div class="note-container"></div>
    
    
    `;
};

export default noteWrapper;
