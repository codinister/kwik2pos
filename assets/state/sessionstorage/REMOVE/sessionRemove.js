
const sessionRemove = (statename) => {
    if(sessionStorage.getItem(statename)){
        sessionStorage.removeItem(statename)
    }
}

export default sessionRemove