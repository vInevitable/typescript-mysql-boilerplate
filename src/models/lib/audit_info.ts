import {IBaseRecord} from 'src/models/lib/base_record';

export interface IAuditInfo {
    createdBy: IBaseRecord;
    creationTime: Date;
    lastUpdatedBy: IBaseRecord;
    lastUpdatedTime: Date;
}

export class AuditInfo implements IAuditInfo {
    public createdBy: IBaseRecord;
    public creationTime: Date;
    public lastUpdatedBy: IBaseRecord;
    public lastUpdatedTime: Date;

    constructor(createdBy: IBaseRecord,
                creationTime: Date,
                lastUpdatedBy: IBaseRecord,
                lastUpdatedTime: Date) {
        this.createdBy = createdBy;
        this.creationTime = creationTime;
        this.lastUpdatedBy = lastUpdatedBy;
        this.lastUpdatedTime = lastUpdatedTime;
    }
}
