
const fetchApiUrl = (controller,task) => {
  return `router.php?controller=${controller}&task=${task}`
}

export default fetchApiUrl