import getSearchParam from "./getSearchParam.js"

const setSearchParamURL = (num) => {
  const {page} = getSearchParam()
  history.pushState('',null, `?page=${page}&p=${num}`)
  sessionStorage.setItem('rend', '246')
}

export default setSearchParamURL