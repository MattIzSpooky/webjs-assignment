import {Clothes} from '../models/Clothes';
import {Tierlantine} from '../models/Tierlantine';
import {Decoration} from '../models/Decoration';

export class ProductFactory {
    fromSaveable(product) {
        if (!product.type) {
            throw new Error(`Invalid Product!: ${JSON.stringify(product)}`);
        }

        if (product.type === 'Clothes') {
            return Clothes.fromSaveable(product);
        }

        if (product.type === 'Tierlantine') {
            return Tierlantine.fromSaveable(product);
        }

        if (product.type === 'Decoration') {
            return Decoration.fromSaveable(product);
        }

        throw new Error('Unknown product type');
    }
}
