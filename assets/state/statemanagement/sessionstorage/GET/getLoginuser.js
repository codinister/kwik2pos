const getLoginuser = (name) => {
  if (sessionStorage.getItem('zsdf')) {
    const {settings, user, menu} = JSON.parse(sessionStorage.getItem('zsdf'));

    if(name === 'settings') return settings 
    else if(name === 'user') return user 
    else if(name === 'menu') return menu 

  } else {
    return []
  }
};

export default getLoginuser;
