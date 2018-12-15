function partition(list, lo, hi)
{
  let i = lo + 1;
  let pivot = list[lo].key;
  for (let j = lo + 1; j < hi + 1; ++j) {
    if (list[j].key < pivot) {
      let clone = list[i].key;
      list[i].key = list[j].key;
      list[j].key = clone;
      i++;
    }
  }

  let clone = list[lo].key;
  list[lo].key = list[i-1].key;
  list[i-1].key = clone;
  return i - 1;
}

function quicksort(list, lo, hi)
{
  if (lo < hi) {
    let p = partition(list, lo, hi);
    quicksort(list, lo, p-1);
    quicksort(list, p+1, hi);
  }
}

let arr = [1,12,5,26,7,14,3,7,2];
let list = [
  {key: 'Devin'},
  {key: 'Jackson'},
  {key: 'James'},
  {key: 'Joel'},
  {key: 'John'},
  {key: 'Jillian'},
  {key: 'Jimmy'},
  {key: 'Julie'},
]

console.log(`----original:`);
for (let e of list) {
  console.log(e);
}
quicksort(list, 0, list.length-1);

console.log(`----after:`);
for (let e of list) {
  console.log(e);
}
