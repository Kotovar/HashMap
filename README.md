# HashMap

This project implements a hash map

## How to use

Open the file, open the console and run: `node index.js`

## How it works

This project implements the following methods:

`hash` - takes a value and produces a hash code with it.

`set` -takes two arguments, the first is a key and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten. Grow buckets size when it needs to, by calculating if bucket has reached the load factor.

`get` - takes one argument as a key and returns the value that is assigned to this key. If key is not found, return **null**.

`has` - takes a key as an argument and returns **true** or **false** based on whether or not the key is in the hash map.

`remove` - takes a key as an argument. If the given key is in the hash map, it removes the entry with that key and return **true**. If the key isn’t in the hash map, it returns **false**.

`length` - returns the number of stored keys in the hash map.

`clear` - removes all entries in the hash map.

`keys` - returns an array containing all the keys inside the hash map.

`values` - returns an array containing all the values

`entries` - returns an array that contains each **key, value** pair

For the example in the image, the following commands were executed:

```
test.set(1, 'one');
test.set(2, 'two');
test.set(3, 'three');
test.set(4, 'ten');
test.set(4, 'four');
test.set(5, 'five');
test.set(6, 'six');
test.set(7, 'seven');
test.set(23432, 'crazy');
test.set(8, 'eight');
test.set(9, 'nine');
test.set(10, 'ten');
console.log(test);
console.log(`get 16 element = ${test.get(5)}`);
console.log(`has 16 element? It's ${test.has(7)}`);
console.log(`has 435 element? It's ${test.has(435)}`);
console.log(`buckets size before delete key 23432 = ${test.length()}`);
test.remove(23432);
console.log(`buckets size after delete key 23432 = ${test.length()}`);
console.log(`keys: ${test.keys()}`);
console.log(`values: ${test.values()}`);
console.log(`entries: ${test.entries()}`);
console.log(`clear everything`);
test.clear();
console.log(test);
```

## Credits

This project was inspired by [The Odin Project](https://www.theodinproject.com/lessons/javascript-hashmap), which is an open source curriculum for learning web development.
