import { Request, Response } from "express";
import { UserUseCase } from "../../application/usecases/user.usecase";
import { inject, injectable } from "tsyringe";

@injectable()
export default class UserController {
  constructor(@inject("UserUseCase") private userUseCase: UserUseCase) {}

  async findById(request: Request, response: Response) {
    try {
      const userId = request.params.id;
      const user = await this.userUseCase.findById(userId);
      response.json(user);
    } catch (error) {
      response.status(500).json({ error: "Failed to fetch user" });
    }
  }
}
