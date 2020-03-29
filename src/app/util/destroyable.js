export class Destroyable {
    constructor() {
        if (new.target === Destroyable) {
            throw new TypeError("Cannot construct Destroyable instances directly");
        }
    }

    destroy() {
        throw new Error("Method 'destroy()' must be implemented.");
    }
}
