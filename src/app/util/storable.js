/**
 * An abstract class
 */
export class Storable {
    constructor() {
        if (new.target === Storable) {
            throw new TypeError("Cannot construct Storable instances directly");
        }
    }

    save() {
        throw new Error("Method '_persist()' must be implemented.");
    }

    _recover() {
        throw new Error("Method '_recover()' must be implemented.");
    }
}