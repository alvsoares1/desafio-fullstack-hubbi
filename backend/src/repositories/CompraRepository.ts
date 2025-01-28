// src/repositories/CompraRepository.ts
import { ICompraRepository } from "./ICompraRepository";
import { Compras } from "../entities/Compras";
import { AppDataSource } from "../data-source";
import { FindManyOptions, FindOneOptions } from "typeorm";

export class CompraRepository implements ICompraRepository {
  private repository = AppDataSource.getRepository(Compras);

  async create(purchase: Compras): Promise<Compras> {
    return this.repository.create(purchase);
  }

  async save(purchase: Compras): Promise<Compras> {
    return this.repository.save(purchase);
  }

  async find(options?: FindManyOptions<Compras>): Promise<Compras[]> {
    return this.repository.find(options);
  }

  async findOne(options: FindOneOptions<Compras>): Promise<Compras | null> {
    return this.repository.findOne(options);
  }
}