import {Controller} from './Controller';
import {ProductDetailView} from '../views/ProductDetailView';
import {CustomAttribute} from '../models/product';
import {fileToBase64} from '../util/file';

export class ProductDetailController extends Controller {
    #product;
    #updateSquareInViewCallback;

    constructor(region, product, onProductUpdated) {
        super();
        this._model = region;
        this.#product = product;
        this.updateSquareInViewCallback = onProductUpdated;
        this._view = new ProductDetailView(product, this.#onProductDetailsForm, this.#onClose, this.#onProductDetailsImageClick);
    }

    #onClose = () => {
        this.#product = null;

        this.destroy();
    };

    /**
     * @param {FormData} formData
     * @param {String} drawing
     * @returns {Promise<Boolean>}
     */
    #onProductDetailsForm = async (formData, drawing) => {
        try {
            this.#product.setComment(formData.get('comment'));

            const imageFile = formData.get('productImage');

            if (imageFile.size > 0) {
                this.#product.setImage(await fileToBase64(imageFile));
            }

            this.#product.setSignImage(drawing);

            this.#product.clearCustomAttributes();
            // Remove the ones we dont want as custom. we already have their data.
            formData.delete('comment');
            formData.delete('productImage');

            for (const [key, value] of formData) {
                this.#product.addCustomAttribute(new CustomAttribute(key, value));
            }

            this.#product.save();
            this.updateSquareInViewCallback();

            return true;
        } catch (e) {
            this.showError(`Error`, e.message);

            return false;
        }
    };

    #onProductDetailsImageClick = () => {
        this.#product.setImage(null);
    };
}
