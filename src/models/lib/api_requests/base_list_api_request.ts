import {Pagination, SORT_ORDER} from 'constants/app_defaults';

export interface IBaseListAPIRequest {
    searchText?: string;
    offset?: number;
    limit?: number;
    queryId?: string;
    sortBy?: string;
    sortOrder?: string;
}

export class BaseListAPIRequest implements IBaseListAPIRequest {
    public searchText?: string;
    public offset?: number;
    public limit?: number;
    public queryId?: string;
    public sortBy?: string;
    public sortOrder?: string;

    constructor(searchText: string, offset?: number, limit?: number, queryId?: string, sortBy?: string,
                sortOrder?: string) {
        this.searchText = searchText;
        this.offset = typeof offset !== 'undefined' ? +offset : Pagination.OFFSET;
        this.limit = typeof limit !== 'undefined' ? +limit : Pagination.LIMIT;
        this.queryId = queryId;
        this.sortBy = sortBy;
        this.sortOrder = sortOrder ?? SORT_ORDER;
    }
}
