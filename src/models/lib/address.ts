import {BaseRecord, IUserSession} from 'models';
import {AuditInfo} from 'models';
import {BaseRecordAudit, IBaseRecordAudit} from 'models';
import {ICity} from 'src/models/lib/city';
import {ICountry} from 'models';
import {IState} from 'src/models/lib/state';

export interface IAddress extends IBaseRecordAudit {
    addressLine1: string;
    addressLine2?: string;
    city: ICity;
    state: IState;
    country: ICountry;
    postalCode: string;
}

export class Address extends BaseRecordAudit implements IAddress {
    public addressLine1: string;
    public addressLine2?: string;
    public city: ICity;
    public state: IState;
    public country: ICountry;
    public postalCode: string;

    constructor(addressLine1: string, city: ICity, state: IState, country: ICountry, postalCode: string,
                addressLine2?: string, id?: string, loggedInUser?: IUserSession) {
        if (loggedInUser) {
            super(id, null,
                new AuditInfo(
                    new BaseRecord(loggedInUser.userId),
                    new Date(),
                    new BaseRecord(loggedInUser.userId),
                    new Date()));
        } else {
            super(id);
        }
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.state = state;
        this.country = country;
        this.postalCode = postalCode;
    }
}
