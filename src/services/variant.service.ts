import { get, post, put } from '@/lib/api';
import { IVariantPayload, IVariantsResponse } from '@/types/product';

export const variantService = {
    async getAllVariantByProductId(productId: string) {
        const res = await get<IVariantsResponse>(`/products/variant/${productId}/all`);
        return res;
    },
    async createVariant(body: FormData) {
        const res = await post<null>(`/products/variant`, body);
        return res;
    },
    async updateVariant(body: FormData) {
        const res = await put<null>(`/products/variant/update`, body);
        return res;
    },
};
