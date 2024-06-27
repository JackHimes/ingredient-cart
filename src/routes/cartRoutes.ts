import { Router, Request, Response } from 'express';
import { CartController } from '../cart/cartController';

const router = Router();

const cartController = new CartController();

router.post('/cart/add', async (req: Request, res: Response) => {
  try {
    const result = await cartController.addToCart(req.body.items, req.headers.authorization);
    res.json(result);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

export default router;