import {BaseRecord} from 'src/models/lib/base_record';

export interface IState {
    code?: string;
    id: string;
    name?: string;
}

export class State extends BaseRecord implements IState {
    public code?: string;
    public name?: string;
    public id: string;

    constructor(id: string, name?: string, code?: string) {
        super(id, name);
        this.code = code;
    }
}
