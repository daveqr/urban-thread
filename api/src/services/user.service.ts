import UserModel from '../models/user.model';

class UserService {
  constructor() {}

  async createUserAndSave(email: string, password: string, fname: string, lname: string): Promise<UserModel> {
    return UserModel.createUser({
      email: email,
      password: password,
      fname: fname,
      lname: lname,
    });
  }
}

export default UserService;
