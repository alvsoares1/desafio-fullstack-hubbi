// src/repositories/VendaRepository.ts
import { IVendaRepository } from "./IVendaRepository";
import { Venda } from "../entities/Vendas";
import { AppDataSource } from "../data-source";
import { SaleStatus } from "../enums/SaleStatus";
import { Produtos } from "../entities/Produtos";
import { FindManyOptions, FindOneOptions } from "typeorm";

export class VendaRepository implements IVendaRepository {
  private repository = AppDataSource.getRepository(Venda);

  async createSale(data: {
    produtos: Produtos[];
    precoTotal: number;
    status: SaleStatus;
  }): Promise<Venda> {
    const sale = new Venda();
    sale.produtos = data.produtos;
    sale.precoTotal = data.precoTotal;
    sale.status = data.status;
    return sale;
  }

  async save(sale: Venda): Promise<Venda> {
    return this.repository.save(sale);
  }

  async find(options?: FindManyOptions<Venda>): Promise<Venda[]> {
    return this.repository.find(options); 
  }
  
  async getAllSales(): Promise<Venda[]> {
    return this.find({ relations: ["produtos"] }); 
  }

  async findOne(options: FindOneOptions<Venda>): Promise<Venda | null> {
    return this.repository.findOne(options);
  }
}