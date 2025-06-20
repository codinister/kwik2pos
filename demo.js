const arr = [
  {},
  {},
  {},
  '',
  '',
  { [23]: { name: 'Daniel', age: 23 } },
  {},
  { [33]: { name: 'Edna', age: 33 } },
].filter(v => Object.values(v).length)
.map(v => Object.values(v)).flat(2)

console.log(arr)
