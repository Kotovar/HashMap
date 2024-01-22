// if (index < 0 || index >= buckets.length) {
//     throw new Error("Trying to access index out of bound");
//   }

import {LinkedList} from './linked_lists.mjs';

// let list = new LinkedList();
// list.append(5, 'test').append(7, 'method');
// console.log(list.toString());
// let key = 5;
// let index = list.find(key);

// if (index < 0) {
// 	console.log('нет такого индекса');
// } else {
// 	list.insertAt(key, 'changed', index);
// 	list.removeAt(index + 1);
// }

// console.log(list.toString());

class HashMap {
	constructor(capacity = 16) {
		this.capacity = capacity;
		this.buckets = Array.from({length: this.capacity}, () => new LinkedList());
	}

	size = 0;
	loadFactor = 0.75;

	hash(string) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < string.length; i++) {
			hashCode = primeNumber * hashCode + string.charCodeAt(i);
		}

		return hashCode % this.capacity;
	}

	set(key, value) {
		let hashCode = this.hash(key.toString()); //число от 0 до 15 для хэша
		let list = this.buckets[hashCode]; // получаем связный список
		let keyInList = list.find(key); //ищем в списке ключ
		if (keyInList === `The current LinkedList is empty` || keyInList === -1) {
			list.append(key, value);
			this.size++;
			return;
		}

		list.insertAt(key, value, keyInList);
		list.removeAt(keyInList + 1);
	}

	// get(key) {}

	// has(key) {}
}

let test = new HashMap();
// console.log(test.hash('Fred'));

test.set(16, 'Jouse');
test.set(21, 'Jouse');
test.set(16, 'New');
test.set(8, 'dasdsa');
test.set(1, 'dasda');
test.set(65, 'fsfsd');
test.set(645645, 'fsdfsd');
test.set(0, 'sdfsdfsdf');
