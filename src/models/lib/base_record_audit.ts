import {IAuditInfo} from 'src/models/lib/audit_info';
import {BaseRecord, IBaseRecord} from 'src/models/lib/base_record';

export interface IBaseRecordAudit extends IBaseRecord {
    auditInfo?: IAuditInfo;
    clientId?: string;
}

export class BaseRecordAudit extends BaseRecord implements IBaseRecordAudit {
    public auditInfo?: IAuditInfo;
    public clientId?: string;

    constructor(id?: string, name?: string, auditInfo?: IAuditInfo, clientId?: string) {
        super(id, name);
        this.auditInfo = auditInfo;
        this.clientId = clientId?.toString();
    }
}
