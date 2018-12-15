class Fixed_Array
{
  constructor(cap = 0) {
    this.array = new Array(cap);
    this.capacity = cap;
  }

  max_size()
    { return this.capacity; }

  at(pos) {
    if (0 <= pos && pos < this.capacity)
      return this.array[pos];
    throw "out_of_range";
  }

  put(data, pos) {
    if (0 <= pos && pos < this.capacity) {
      this.array[pos] = data;
      return;
    }
    throw "out_of_range";
  }

  front()
    { return this.array[0]; }

  back()
    { return this.array[this.capacity-1]; }
}

let sa = new Fixed_Array(4);
sa.put('guitar', 0);
sa.put('drum', 2);
sa.put('violin', 1);
sa.put('harp', 3);
sa.put('harmocica', 4);
for (let i=0; i!=sa.max_size(); ++i)
  console.log(sa.at(i));