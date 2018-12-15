console.log(
  nums.map((item, index, array) =>
    Number.parseInt(/* string: */ item, /* radix: */ index, array),
  ),
);
