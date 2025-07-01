import { errorMessage } from '../Message';

export const variationsValidator = async (_: any, variants: any[]) => {
    if (!variants) {
        return errorMessage('Hãy thêm ít nhất 1 biến thể cho sản phẩm!');
    }
    if (!variants || variants.length < 1) {
        return errorMessage('Hãy thêm ít nhất 1 biến thể cho sản phẩm!');
    }

    const variationEmpty = variants.some((variation) => variation === undefined);
    if (variationEmpty) {
        return errorMessage('Hãy thêm ít nhất 1 biến thể cho sản phẩm!');
    }
    return Promise.resolve();
};
