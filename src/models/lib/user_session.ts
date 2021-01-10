export interface IUserSession {
    userId: string;
    roleId: string;
    permissions: string[];
}

export class UserSession implements IUserSession {
    public userId: string;
    public roleId: string;
    public permissions: string[];

    constructor(userId: string, roleId: string, permissions?: string[]) {
        this.userId = userId || null;
        this.roleId = roleId || null;
        this.permissions = permissions || [];
    }
}
