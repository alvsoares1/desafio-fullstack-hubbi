import { Request, Response } from 'express';
import { ProdutoService } from '../services/ProdutoService';
import { ProdutoRepository } from '../repositories/ProdutoRepository';

export class ProdutoController {
  private produtoService = new ProdutoService(new ProdutoRepository()); 

  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { name, price } = req.body;
      const newProduct = await this.produtoService.createProduct(name, price);
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar produto' });
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.produtoService.getAllProducts();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao obter produtos' });
    }
  }
}
