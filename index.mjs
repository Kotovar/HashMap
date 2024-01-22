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

	_findLinkedListIndex(key) {
		if (typeof key !== 'number' && typeof key !== 'string') {
			throw new Error('key must be a number or string');
		}

		let hashCode = this.hash(key.toString()); //число от 0 до 15 для хэша
		let list = this.buckets[hashCode]; // получаем связный список
		let keyInList = list.find(key); //ищем в списке ключ
		return [
			keyInList,
			list,
			keyInList === `The current LinkedList is empty` || keyInList === -1,
		];
	}

	set(key, value) {
		let [index, list, check] = this._findLinkedListIndex(key);
		if (check) {
			list.append(key, value);
			this.size++;
			return;
		}

		list.insertAt(key, value, index);
		list.removeAt(index + 1);
	}

	get(key) {
		let [index, list, check] = this._findLinkedListIndex(key);
		if (check) {
			return null;
		}

		return list.at(index).value;
	}

	has(key) {
		return !this._findLinkedListIndex(key)[2];
	}

	remove(key) {
		let result = this._findLinkedListIndex(key);

		if (!result[2]) {
			result[1].removeAt(result[0]);
			this.size--;
			return true;
		}

		return false;
	}

	length() {
		return this.size;
	}

	clear() {
		this.size = 0;
		this.capacity = 16;
		this.buckets = Array.from({length: this.capacity}, () => new LinkedList());
	}

	_iteration(mode) {
		let result = [];
		for (let list of this.buckets) {
			if (list.size() !== 0) {
				mode !== 'entries'
					? result.push(...list.toString(mode).trim().split(' '))
					: result.push(list.toString(mode));
			}
		}
		return result;
	}

	keys() {
		return this._iteration('key');
	}

	values() {
		return this._iteration('value');
	}

	entries() {
		return this._iteration('entries').flat();
	}
}

let test = new HashMap();

test.set(16, 'Jouse');
test.set(21, 'Jouse');
test.set(16, 'New');
test.set(8, 'dasdsa');
test.set('1', 'dasda');
test.set(65, 'fsfsd');
test.set(645645, 'fsdfsd');
test.set(0, 'sdfsdfsdf');
test.set(7, 'sdfsdfsdf');
// console.log(test.buckets);
// console.log(test.get(16));
// console.log(test.has(16));
// console.log(test.has(4324234));
// console.log(test.buckets);
// console.log(test.buckets);
test.remove(16);
// console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
console.log(test.length());
// console.log(test.remove(0));
// console.log(test.remove(645645));
// console.log(test.remove(21));
// console.log(test);
// console.log(test);
// console.log(test.clear());
// console.log(test);
