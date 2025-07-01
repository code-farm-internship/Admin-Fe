import { IDiscountResponse } from './discount';
import { IFormat } from './format';

export interface IProduct {
    _id: string;
    name: string;
    description?: string;
    author: string;
    sold: number;
    rating: number;
    reviewCount: number;
    status: string;
    isAvailable: boolean;
    thumbnail?: string;
    priceRange: {
        min: number;
        max: number;
    };
    createdAt: string;

    categoryId?: {
        _id: string;
        name: string;
    };
    vendorId?: {
        _id: string;
        name: string;
    };
}

export interface IGetAllProductsResponse {
    products: IProduct[];
    totalDocs: number;
    totalPages: number;
}

export interface IVariantsResponse {
    variants: {
        _id: string;
        imageUrlRef: string;
        image: string;
        price: number;
        stock: number;
        formatId: IFormat;
        createdAt: string;
        updatedAt: string;
        discountId: IDiscountResponse;
    }[];
}

export interface IVariantTableItem {
    _id: string;
    price: number;
    stock: number;
    format: string;
    discountType: string;
    discountValue: number;
    image: string;
}

export interface ISelectProductVariant {
    _id: string;
    name: string;
}
export interface IThumbnailAntd extends File {
    uid: string;
    originFileObj: File;
    nameRef: string;
}

export interface IImageFiles {
    file: IThumbnailAntd;
    fileList: FileList;
}

export interface IVariantForm {
    variants: {
        _id?: string;
        image: IImageFiles | null;
        price: number;
        stock: number;
        format: string;
        discount: string;
    }[];
}
export interface IVariantPayload {
    imageRef?: string;
    price: number;
    stock: number;
    formatId: string;
    discountId: string;
    _id?: string;
}
