export interface IParams {
    [key: string]: any;
    page?: string;
    limit?: string;
    sort?: string;
    fields?: string;
    search?: string;
}

export interface IPaginateResponse<T> {
    data: T;
    limit: number;
    totalDocs: number;
    totalPages: number;
}

export interface IErrorResponse {
    response: {
        data: {
            message: string;
        };
    };
}
