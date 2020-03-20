export class Column {
    #type;
    #width;

    setType(type) {
        if (!/^(sm|md|lg|xl)$/.test(type)) {
            throw new Error('Invalid type. Should be sm, md, lg or xl.');
        }

        this.#type = type;
    }

    setWidth(width) {
        if (!width) {
            throw new Error('Width is not optional');
        }

        if (width < 1 || width > 12) {
            throw new Error('Only widths between 1 and 12 are supported.')
        }


        this.#width = width;
    }

    getWidth() {
        return this.#width;
    }

    getType() {
        return this.#type;
    }

    static isValid(columnAsString) {
        return /^\bcol((-(?:sm|md|lg|xl)-(?:[1-9]|[0-1][0-2]))?|((?:-[1-9]|-[0-1][0-2])))$/.test(columnAsString);
    }
}

export class ColumnBuilder {
    #column = new Column();

    addType(type) {
        this.#column.setType(type);

        return this;
    }

    addWidth(width) {
        this.#column.setWidth(width);

        return this;
    }

    getResult() {
        let result = '';

        if (!this.#column.getType() && !this.#column.getWidth()) {
            result = `col`;
        } else {
            result = `col-${this.#column.getType()}-${this.#column.getWidth()}`;
        }

        if (!Column.isValid(result)) {
            throw new Error(`Invalid column: ${result}`);
        }

        return result;
    }
}