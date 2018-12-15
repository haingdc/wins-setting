function binary_search(list, k, low, high) {
  if (low > high)
    return null;
  else {
    mid = Math.floor((low+high) / 2);
    guess = list[mid].key;
    if (k === guess)
      return mid;
    if (k < guess)
      return binary_search(list, k, low, mid-1);
    else
      return binary_search(list, k, mid+1, high);
  }
}

const my_list = [
  { key: 1, val: "red" },
  { key: 3, val: "green" },
  { key: 5, val: "blue" },
  { key: 7, val: "yellow" }];

let item = -1;
let idx = binary_search(my_list, item, 0, my_list.length-1)
if (idx)
  console.log(`The key ${item} has value: ${my_list[idx].val}`);
else
  console.log(`The key is not found!`);