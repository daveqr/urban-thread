import User from "../models/user.model";

interface UserService {
    findByUuid(uuid: string): Promise<User | null>;

    save(user: User): Promise<void>;
}

export default UserService;
