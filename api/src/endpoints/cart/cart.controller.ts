import {Request, Response} from 'express';

export default class CartController {
    async getCart(req: Request, res: Response) {
        try {
            res.status(200).json({message: 'OK'});
        } catch (error) {
            res.status(500).json({error: 'Failed to fetch cart'});
        }
    }
}
