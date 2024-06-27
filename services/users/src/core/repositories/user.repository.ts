import User from "../models/user.model";

export interface UserRepository {
    findById(id: string): Promise<User | null>;

    save(user: User): Promise<void>;
}
