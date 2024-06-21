import { Router, Request, Response } from 'express';
import { ProductsController } from '../products/productsController';

const router = Router();

const productsController = new ProductsController();

router.post('/products/getItemsUpcs', async (req: Request, res: Response) => {
  try {
    const itemsUpcs = await productsController.getItemsUpcs(req.body.items, req.headers.authorization);
    res.json(itemsUpcs);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;