export interface IVendor {
    _id: string;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}
export interface IGetAllVendorResponse {
    vendor: IVendor[];
    limit: number;
    totalDocs: number;
    totalPage: number;
}
