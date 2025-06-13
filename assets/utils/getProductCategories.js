const getProductCategories = async (callback)=>{
   const categories = JSON.parse(sessionStorage.getItem('kwikcategories'))
   callback(categories)
}

export default getProductCategories