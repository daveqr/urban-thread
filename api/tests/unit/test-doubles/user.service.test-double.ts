import User from "../../../src/core/models/user.model";
import {UserService} from "../../../src/core/services/user.service";

export class UserServiceTestDouble implements UserService {
    findById(uuid: string): Promise<User | null> {
        return Promise.resolve(null);
    }

    save(user: User): Promise<void> {
        return Promise.resolve();
    }
}
