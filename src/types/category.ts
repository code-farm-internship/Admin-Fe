export interface ICategory {
    _id: string;
    name: string;
    slug: string;
    parentId?: string;
    image?: string;
    description?: string;
    isDeleted?: boolean;
    createdAt?: string;
}

export interface IGetAllCategoriesResponse {
    categories: ICategory[];
    limit: number;
    totalDocs: number;
    totalPage: number;
}
