// https://www.taniarascia.com/javascript-mvc-todo-app/
export class TestController {
    #testModel;
    #testView;

    constructor(model, view) {
        this.#testModel = model;
        this.#testView = view;

        view.renderCount(model.count);
        view.bindIncrement(this.#onIncrement);
        view.bindDecrement(this.#onDecrement);
    }

    #onIncrement = () => {
        this.#testModel.increment();
        this.#testView.renderCount(this.#testModel.count)
    };

    #onDecrement = () => {
        this.#testModel.decrement();
        this.#testView.renderCount(this.#testModel.count)
    };
}