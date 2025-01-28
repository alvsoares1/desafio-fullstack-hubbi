import { Request, Response } from "express";
import { CompraService } from "../services/CompraService";
import { CompraRepository } from "../repositories/CompraRepository";
import { ProdutoRepository } from "../repositories/ProdutoRepository";
import { VendaRepository } from "../repositories/VendaRepository";

export class CompraController {
    private compraService: CompraService;

    constructor() {
      const compraRepository = new CompraRepository();
      const produtoRepository = new ProdutoRepository();
      const vendaRepository = new VendaRepository();
  
      this.compraService = new CompraService(
        compraRepository,
        produtoRepository,
        vendaRepository
      );
    }

    async purchaseUnit(req: Request, res: Response): Promise<Response> {
        try {
            const { saleId, productIds } = req.body;

            if (!saleId || !productIds || !Array.isArray(productIds) || productIds.length === 0) {
                return res.status(400).json({ message: "É necessário fornecer o ID da venda e os IDs dos produtos." });
            }

            const purchase = await this.compraService.purchaseUnit(saleId, productIds);
            return res.status(201).json(purchase);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao criar a compra.' });
        }
    }

    async purchaseAllProducts(req: Request, res: Response): Promise<Response> {
        try {
            const { saleId } = req.params; 
            const purchase = await this.compraService.purchaseAllProducts(Number(saleId)); 
            return res.status(200).json(purchase); 
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao criar a compra.' }); 
        }
    }
    

    async getAllPurchases(req: Request, res: Response): Promise<Response> {
        try {
            const purchases = await this.compraService.getAllPurchases();
            return res.status(200).json(purchases);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao obter as compras.' });
        }
    }
}
