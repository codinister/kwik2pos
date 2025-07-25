
const sessionSet = ({...options}) => {
    const {statename,content} = options 
        sessionStorage.setItem(statename, JSON.stringify(content))
    
}

export default sessionSet