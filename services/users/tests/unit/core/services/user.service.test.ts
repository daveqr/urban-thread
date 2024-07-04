import "reflect-metadata";
import { container } from "tsyringe";
import { UserServiceImpl } from "../../../../src/core/services/user.service";
import User from "../../../../src/core/models/user.model";

const userRepository = {
  findById: jest.fn(),
  save: jest.fn(),
};

const dataSource = {
  manager: {},
};

const idGenerator = {
  generate: jest.fn(),
};

describe("UserServiceImpl", () => {
  let userService: UserServiceImpl;

  beforeEach(() => {
    container.registerInstance("UserRepository", userRepository);
    container.registerInstance("DataSource", dataSource);
    container.registerInstance("IdGenerator", idGenerator);

    userService = container.resolve(UserServiceImpl);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("findById", () => {
    it("should return a user when found", async () => {
      const userId = "test-id";
      const user: User = {
        id: userId,
        email: "test@example.com",
        password: "password123",
        fname: "John",
        lname: "Doe",
      };

      userRepository.findById.mockResolvedValue(user);

      const result = await userService.findById(userId);

      expect(userRepository.findById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });

    it("should return null when user not found", async () => {
      const userId = "test-id";

      userRepository.findById.mockResolvedValue(null);

      const result = await userService.findById(userId);

      expect(userRepository.findById).toHaveBeenCalledWith(userId);
      expect(result).toBeNull();
    });
  });
});
