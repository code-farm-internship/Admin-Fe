export interface ICategory {
    _id: string;
    name: string;
    parentId?: string;
    level?: number;
    image: string;
    imageUrlRef: string;
    description?: string;
    isDeleted: boolean;
    slug: string;
}
