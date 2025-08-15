import innerHTML from '../../utils/innerHTML.js';
import { classSelector } from '../../utils/Selectors.js';

const modalEvent = () => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.show-modal')) {
      const { modal } = e.target.dataset;
      document.body.style.overflow = 'hidden';
      classSelector('modals-wrapper').classList.add(modal);
      classSelector('modal-box').classList.add(modal);
    }
    if (e.target.matches('.hide-modal')) {
      const modalbxclass = e.target.classList[2];
      e.target.classList.remove(modalbxclass);
      classSelector('modal-box').classList.remove(modalbxclass);

      innerHTML({ classname: 'modal-box', content: '' });
      document.body.style.overflow = 'scroll';
    }

    if (e.target.matches('.close-modal')) {
      let modalbxclass;

      if (classSelector('modal-one')) {
        modalbxclass = 'modal-one';
      } else if (classSelector('modal-two')) {
        modalbxclass = 'modal-two';
      } else if (classSelector('modal-three')) {
        modalbxclass = 'modal-three';
      } else if (classSelector('modal-four')) {
        modalbxclass = 'modal-four';
      }

      classSelector('modals-wrapper').classList.remove(modalbxclass);
      classSelector('modal-box').classList.remove(modalbxclass);

      innerHTML({ classname: 'modal-box', content: '' });
      document.body.style.overflow = 'scroll';
    }
  });
};

export default modalEvent;
