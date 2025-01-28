import { Router, Request, Response } from 'express'; // Importando Request e Response
import { ProdutoController } from '../controllers/ProdutoController';

const router = Router();
const produtoController = new ProdutoController();

router.post('/', async (req: Request, res: Response) => {
  try {
    await produtoController.createProduct(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    await produtoController.getAllProducts(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter produtos' });
  }
})

export default router;
