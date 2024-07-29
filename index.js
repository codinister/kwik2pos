function sum(arr,num){


  let sumarr = []
  let index = 0

  while(index < arr.length){


    const calc = arr[index] + arr[index + 1]

    sumarr.push(calc)
    index += num
  }


  console.log(sumarr)


}



sum([1,2,3,4,5,6,7,8,9,10],4)

