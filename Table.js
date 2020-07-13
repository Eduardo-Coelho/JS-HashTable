function hashStringToInt(string, tableSize) {
  let hash = 17;

  for (let i = 0; i < string.length; i++) {
    hash = (13 * hash * string.charCodeAt(i)) % tableSize;
  }

  return hash;
}

class HashTable {
  table = new Array(3);
  numberOfItems = 0;

  resize = () => {
    const newTable = new Array(this.table.length * 2); // refactoring needed, so it allways sets this to a prime number.

    this.table.forEach((item) => {
      if (item) {
        item.forEach(([key, val]) => {
          const index = hashStringToInt(key, newTable.length);

          if (newTable[index]) {
            newTable[index].push([key, val]);
          } else {
            newTable[index] = [[key, val]];
          }
        });
        // -- end of key, val forEach
      }
      // -- end of item forEach
    });
    this.table = newTable;
  };

  setItem = (key, val) => {
    this.numberOfItems++;
    const loadFactor = this.numberOfItems / this.table.length;
    // if the loadFactor is grater then 80%.
    if (loadFactor > 0.8) {
      // Then resize the table
      this.resize();
    } else {
      const index = hashStringToInt(key, this.table.length);
      if (this.table[index]) {
        this.table[index].push([key, val]);
      } else {
        this.table[index] = [[key, val]];
      }
    }
  };

  getItem = (key) => {
    const index = hashStringToInt(key, this.table.length);

    if (!this.table[index]) {
      return null;
    }
    return this.table[index].find((item) => item[0] === key)[1];
  };
}

let hashtable = new HashTable();
hashtable.setItem("firstName", "eduardo");
hashtable.setItem("lastName", "Coelho");
//hashtable.setItem("firstName", "Anna");
//hashtable.setItem("lastName", "Phong");

console.log(hashtable.table.length);
console.log(hashtable.getItem("firstName"));
