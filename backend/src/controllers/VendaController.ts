import { Request, Response } from 'express';
import { VendaService } from '../services/VendaService';
import { VendaRepository } from '../repositories/VendaRepository';
import { ProdutoRepository } from '../repositories/ProdutoRepository';

export class VendaController {
  private vendaService = new VendaService(new VendaRepository(), new ProdutoRepository());

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { productIds } = req.body;
      if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
        return res.status(400).json({ message: "É necessário fornecer um array de IDs de produtos." });
      }

      const sale = await this.vendaService.createSale(productIds);

      return res.status(201).json(sale);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar a venda.' });
    }
  }

  async getAllSales(req: Request, res: Response): Promise<Response> {
    try {
      const sales = await this.vendaService.getAllSales();
      return res.status(200).json(sales);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao obter as vendas.' });
    }
  }
}
