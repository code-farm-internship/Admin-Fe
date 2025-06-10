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
