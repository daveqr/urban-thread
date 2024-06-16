class User {
    private readonly _uuid: string;
    private readonly _email: string;
    private readonly _password: string;
    private readonly _fname: string;
    private readonly _lname: string;

    constructor(uuid: string, email: string, password: string, fname: string, lname: string) {
        this._uuid = uuid;
        this._email = email;
        this._password = password;
        this._fname = fname;
        this._lname = lname;
    }

    get uuid(): string {
        return this._uuid;
    }

    get email(): string {
        return this._email;
    }

    get password(): string {
        return this._password;
    }

    get fname(): string {
        return this._fname;
    }

    get lname(): string {
        return this._lname;
    }
}

export default User;
