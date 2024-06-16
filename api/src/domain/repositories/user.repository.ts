import User from "../models/user.model";

export interface UserRepository {
    findByUuid(categoryId: string): Promise<User | null>;

    save(user: User): Promise<void>;
}
