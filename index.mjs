import {LinkedList} from './linked_lists.mjs';

class HashMap {
	constructor(capacity = 16) {
		this.capacity = capacity;
		this.buckets = Array.from({length: this.capacity}, () => new LinkedList());
	}

	size = 0;
	loadFactor = 0.75;

	hash(string, capacity) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < string.length; i++) {
			hashCode = primeNumber * hashCode + string.charCodeAt(i);
		}

		return hashCode % capacity;
	}

	_resize() {
		if (this.size >= this.capacity * this.loadFactor) {
			const tempArray = Array.from(
				{length: this.capacity * 2},
				() => new LinkedList(),
			);

			for (let list of this.buckets) {
				let node = list.head;
				while (node !== null) {
					let newHashCode = this.hash(node.key.toString(), this.capacity * 2);

					tempArray[newHashCode].append(node.key, node.value);

					node = node.nextNode;
				}
			}

			this.buckets = tempArray;
			this.capacity = this.capacity * 2;
		}
	}

	_findLinkedListIndex(key) {
		if (typeof key !== 'number' && typeof key !== 'string') {
			throw new Error('key must be a number or string');
		}

		let hashCode = this.hash(key.toString(), this.capacity); //число от 0 до 15 для хэша
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
			if (this.size >= this.capacity * this.loadFactor) {
				this._resize();
			}
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
test.set(21, 'аыв');
test.set(16, 'аываыв');
test.set(23423, 'аываыв');
test.set(23423, 'ываывааыв');
test.set(2342, 'аываываыв');
test.set(23432, 'ываываыва');
test.set(23423, 'Joываываывuse');
test.set(23432, 'Joаываываuse');
test.set(423, 'Joываываuse');
test.set(16, 'New');
test.set(8, 'dasdsa');
test.set('1', 'dasda');
test.set(65, 'fsfsd');
test.set(645645, 'fsdfsd');
test.set(0, 'sdfsdfsdf');
// console.log(test.buckets);
// console.log(test.get(16));
// console.log(test.has(16));
// console.log(test.has(4324234));
// console.log(test.buckets);
// console.log(test.buckets);
// test.remove(16);
// console.log(test.length());
// console.log(test.keys());
// console.log(test.values());
console.log(test.entries());
console.log(test);
console.log(test.get(8));
console.log(test.entries());
console.log(test);
console.log(test.get(8));
// console.log(test.remove(0));
// console.log(test.remove(645645));
// console.log(test.remove(21));
// console.log(test);
// console.log(test);
// console.log(test.clear());
// console.log(test);
