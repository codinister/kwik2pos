function a(fn) {
  return fn(3);
}

function b(fn) {
  return fn(33);
}

function c(fn) {
  return fn(12);
}

const sol = a((data1) => {
  return b((data2) => {
    return c((data3) => {
      const res = data1 + data2 + data3
      return res
    });
  });
});

console.log(sol)
