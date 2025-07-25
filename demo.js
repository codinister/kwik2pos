const obj = [
  {
    name: 'Jessica',
    age: 12,
  },
  {
    name: 'Emmanuel',
    age: 23,
  },
  {
    name: 'Emmanuel',
    age: 27,
  },
  {
    name: 'Jaquelin',
    age: 45,
  },
];


const calcBirthdate = function (v) {
return v?.name
    }

const arr = obj.map((v) => {
  const obj = {
    ...v,
    birthdate: calcBirthdate(v),
  };

  return obj
});

console.log(JSON.stringify(arr,null,2));
