export interface IListAPIResponse {
    list: any[];
    totalResultsCount: number;
    hasMoreResults: boolean;
    url?: string;
    fromIndex: number;
    toIndex: number;
    queryId?: string;
    sortBy?: string;
    sortOrder?: string;
}

export class ListAPIResponse implements IListAPIResponse {
    public list: any[];
    public totalResultsCount: number;
    public hasMoreResults: boolean;
    public url?: string;
    public fromIndex: number;
    public toIndex: number;
    public queryId?: string;
    public sortBy?: string;
    public sortOrder?: string;

    constructor(resultsList: any[], hasMoreResults?: boolean, fromIndex?: number, toIndex?: number,
                totalResultsCount?: number, queryId?: string, sortBy?: string, sortOrder?: string, url?: string) {
        this.list = resultsList;
        this.hasMoreResults = hasMoreResults;
        this.fromIndex = fromIndex;
        this.toIndex = toIndex;
        this.totalResultsCount = totalResultsCount;
        this.queryId = queryId;
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
        this.url = url;
    }
}
