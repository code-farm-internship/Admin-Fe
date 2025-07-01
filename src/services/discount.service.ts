import { get, post, put } from '@/lib/api';
import { IPaginateResponse, IParams } from '@/types/api';
import { IDiscountPayload, IDiscountResponse } from '@/types/discount';

export const discountService = {
    getAllDiscount(params: IParams) {
        const data = get<IPaginateResponse<IDiscountResponse[]>>('/discounts/all', params);
        return data;
    },
    getDetailDiscount(id: string) {
        const data = get<IDiscountResponse>(`/discounts/${id}`);
        return data;
    },
    createDiscount(body: IDiscountPayload) {
        const data = post<null>('/discounts', body);
        return data;
    },
    updateDiscount(body: IDiscountPayload, id: string) {
        const data = put<null>(`/discounts/${id}`, body);
        return data;
    },
};
