export enum DiscountType {
    FIXED = 'fixed',
    PERCENT = 'percent',
}
export interface IDiscountResponse {
    _id: string;
    discountType: DiscountType;
    discountValue: number;
    startDate: string;
    endDate: string;
}

export interface IDiscountPayload {
    discountType: DiscountType;
    discountValue: number;
    startDate: Date;
    endDate: Date;
}
