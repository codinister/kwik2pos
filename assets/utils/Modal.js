
import modalEvent from '../state/events/modalEvent.js'

const Modal = () => {
  modalEvent()
  return `
  <div class="modals-wrapper hide-modal">
  <div class="modal-box"></div>
  </div>
  `
}

export default Modal