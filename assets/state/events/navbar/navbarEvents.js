
const navbarEvents = () => {

  setTimeout(() => {
    if (classSelector('navbaritems')) {
      classSelector('navbaritems').innerHTML = otp;
    }
  }, 0);

  document.addEventListener('click', (e) => {
    if (e.target.matches('.hamburger')) {
      classSelector('nav-bar-wrapper').classList.add('show');
      classSelector('nav-overlay').classList.add('show');
    }

    if (e.target.matches('.nav-overlay')) {
      classSelector('nav-bar-wrapper').classList.remove('show');
      classSelector('nav-overlay').classList.remove('show');
    }

    if (e.target.matches('.close-btn')) {
      classSelector('navbar-nav').classList.remove('show');
      classSelector('navbar-nav').classList.add('hide');
    }

    if (e.target.matches('.navbar-nav-overlay')) {
      classSelector('navbar-nav').classList.add('hide');
    }

    if (e.target.matches('.close-profile-box')) {
      e.stopImmediatePropagation();
      classSelector('profileformbox').classList.remove('show');
    }

    if (e.target.matches('.closeprofilebox')) {
      e.stopImmediatePropagation();
      classSelector('profileformbox').classList.toggle('show');
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target.matches('.uploadsig')) {
      e.stopImmediatePropagation();
      defaultProfilesessionstorage();
      const img = classSelector('simg');
      const fr = new FileReader();
      if (e.target.files && e.target.files[0]) {
        fr.onload = function (e) {
          img.setAttribute('src', e.target.result);
        };
        fr.readAsDataURL(e.target.files[0]);
      }
    }

    if (e.target.matches('.uploadprofimg')) {
      e.stopImmediatePropagation();
      defaultProfilesessionstorage();
      const img = classSelector('profileimage');
      const img2 = classSelector('pimg');
      const fr = new FileReader();
      if (e.target.files && e.target.files[0]) {
        fr.onload = function (e) {
          img.setAttribute('src', e.target.result);
          img2.setAttribute('src', e.target.result);
        };
        fr.readAsDataURL(e.target.files[0]);
      }
    }
  });

}

export default navbarEvents