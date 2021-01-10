import {BaseRecord} from 'src/models/lib/base_record';

export interface ICity {
    name?: string;
    id: string;
    code?: string;
}

export class City extends BaseRecord implements ICity {
    public id: string;
    public name?: string;
    public code?: string;

    constructor(id: string, name?: string, code?: string) {
        super(id, name);
        this.code = code;
    }
}
