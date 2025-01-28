import { Venda } from "../entities/Vendas";
import { IVendaRepository } from "../repositories/IVendaRepository";
import { In } from "typeorm";
import { SaleStatus } from "../enums/SaleStatus";
import { IProdutoRepository } from '../repositories/IProdutoRepository';

export class VendaService {
  constructor(
    private vendaRepository: IVendaRepository,
    private produtoRepository: IProdutoRepository
  ) {}

  async createSale(productIds: number[]): Promise<Venda> {
    const products = await this.produtoRepository.findBy({
      id: In(productIds),
    });
    if (products.length === 0) {
      throw new Error("Nenhum produto encontrado para a venda");
    }

    const sale = new Venda();
    sale.produtos = products;

    const total = sale.produtos.reduce((acc, produtos) => acc + parseFloat(produtos.preco.toString()), 0);
    sale.precoTotal = total;

    sale.status = SaleStatus.PENDING;

    await this.vendaRepository.save(sale);
    return sale;
  }

  async getAllSales(): Promise<Venda[]> {
    return this.vendaRepository.getAllSales(); 
  }
}
