import Buttons from '../../utils/Buttons.js';

const noteSavebtn = () => {
  if (sessionStorage.getItem('usernote')) {
    const length = Object.values(
      JSON.parse(sessionStorage.getItem('usernote'))
    ).filter(Boolean).length;

    if (length > 1) {
      return Buttons([
        {
          btnclass: 'savenotebtn',
          btnname: 'SAVE NOTE',
        },
      ]);
    }
  } else {
    return `<span>All Note details fields required!</span>`;
  }
};

export default noteSavebtn;
