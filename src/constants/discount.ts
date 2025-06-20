import { DiscountType } from '@/types/discount';

export const MIN_PERCENT_DISCOUNT = 1;
export const MAX_PERCENT_DISCOUNT = 99;
export const MIN_FIXED_DISCOUNT = 1000;
export const MAX_FIXED_DISCOUNT = 1000000;
export const discountTypeItems = [
    {
        value: DiscountType.PERCENT,
        label: 'Phần trăm',
    },
    {
        value: DiscountType.FIXED,
        label: 'Cố định',
    },
];
