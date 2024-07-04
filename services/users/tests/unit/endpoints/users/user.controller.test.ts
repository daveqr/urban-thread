import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import UserController from "../../../../src/endpoints/users/user.controller";

const mockUserUseCase = {
  findById: jest.fn(),
};

describe("UserController", () => {
  let userController: UserController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    container.registerInstance("UserUseCase", mockUserUseCase);
    userController = container.resolve(UserController);

    req = {
      params: {
        id: "test-id",
      },
    };

    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("findById", () => {
    it("should return user when found", async () => {
      const user = { id: "test-id", email: "test@example.com" };
      mockUserUseCase.findById.mockResolvedValue(user);

      await userController.findById(req as Request, res as Response);

      expect(mockUserUseCase.findById).toHaveBeenCalledWith("test-id");
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it("should return 500 if an error occurs", async () => {
      const error = new Error("Failed to fetch user");
      mockUserUseCase.findById.mockRejectedValue(error);

      await userController.findById(req as Request, res as Response);

      expect(mockUserUseCase.findById).toHaveBeenCalledWith("test-id");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Failed to fetch user" });
    });
  });
});
