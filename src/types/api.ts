export interface IParams {
    [key: string]: any;
    page?: string;
    limit?: string;
    sort?: string;
    fields?: string;
}

export interface IPaginateResponse<T> {
    data: T;
    limit: number;
    totalDocs: number;
    totalPages: number;
}
