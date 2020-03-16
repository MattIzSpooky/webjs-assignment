export class TestModel {
    #count = 0;

    static #PERSIST_KEY = 'counter';

    constructor() {
        this._recover()
    }

    get count() {
        return this.#count;
    }

    increment() {
        this.#count++;
        this._persist();
    }

    decrement() {
        this.#count--;
        this._persist();
    }

    _persist() {
        localStorage.setItem(TestModel.#PERSIST_KEY, this.#count);
    }

    _recover() {
        const countFromStorage = localStorage.getItem(TestModel.#PERSIST_KEY);

        if (countFromStorage) {
            this.#count = +countFromStorage;
        }
    }
}