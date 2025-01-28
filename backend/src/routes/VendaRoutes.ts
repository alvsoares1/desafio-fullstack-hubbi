import { Router, Request, Response } from 'express';
import { VendaController } from '../controllers/VendaController';

const router = Router();
const vendaController = new VendaController();

router.post('/', async (req: Request, res: Response) => {
  try {
    await vendaController.create(req, res); 
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar venda' }); 
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    await vendaController.getAllSales(req, res); 
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter vendas' }); 
  }
})

export default router;
