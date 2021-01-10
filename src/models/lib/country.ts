import {BaseRecord} from 'src/models/lib/base_record';

export interface ICountry {
    code?: string;
    id: string;
    name?: string;
    phoneCode?: string;
}

export class Country extends BaseRecord implements ICountry {
    public code?: string;
    public name?: string;
    public id: string;
    public phoneCode: string;

    constructor(id: string, code?: string, name?: string, phoneCode?: string) {
        super(id, name);
        this.code = code;
        this.phoneCode = phoneCode;
    }
}
