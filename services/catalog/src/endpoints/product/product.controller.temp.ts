import { Request, Response } from "express";

export default class ProductControllerTemp {
  constructor() {}

  async findAllProducts(request: Request, response: Response) {
    try {
      response.json({ message: "called find all controller" });
    } catch (error) {
      response.status(500).json({ error: "Failed to fetch products" });
    }
  }
}
