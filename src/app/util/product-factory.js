import {Clothes} from '../models/Clothes';
import {Tierlantine} from '../models/Tierlantine';
import {Decoration} from '../models/Decoration';

export class ProductFactory {
    fromJSON(data) {
        const product = JSON.parse(data);

        if (!product.type) {
            throw new Error(`Invalid Product!: ${data}`);
        }

        if (product.type === 'Clothes') {
            return Clothes.fromJSON(data);
        }

        if (product.type === 'Tierlantine') {
            return Tierlantine.fromJSON(data);
        }

        if (product.type === 'Decoration') {
            return Decoration.fromJSON(data);
        }

        throw new Error('Unknown product type');
    }
}