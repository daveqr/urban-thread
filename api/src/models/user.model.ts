import mongoose from 'mongoose';
import { userSchema } from '../schemas/user.schema';

class UserModel {
    private static User = mongoose.model('User', userSchema);

    private constructor(private user: mongoose.Document) { }

    static async createUser(userData: {
        email: string;
        password: string;
        fname: string;
        lname: string;
    }): Promise<UserModel> {
        try {
            const newUser = new UserModel.User(userData);
            await newUser.save();
            return new UserModel(newUser);
        } catch (error) {
            throw error;
        }
    }

    static async findById(userId: string): Promise<UserModel | null> {
        const user = await UserModel.User.findById(userId).exec();
        return user ? new UserModel(user) : null;
    }

    static async userExists(email: string): Promise<boolean> {
        const count = await UserModel.User.countDocuments({ email });
        return count > 0;
    }

    get id(): string {
        return this.user.get('_id');
    }

    get password(): string {
        return this.user.get('password');
    }

    get email(): string {
        return this.user.get('email');
    }

    get fname(): string {
        return this.user.get('fname');
    }

    get lname(): string {
        return this.user.get('lname');
    }
}

export default UserModel;
