import { Compras } from "../entities/Compras";
import { FindManyOptions, FindOneOptions } from "typeorm";

export interface ICompraRepository {
  create(purchase: Compras): Promise<Compras>;
  save(purchase: Compras): Promise<Compras>;
  find(options?: FindManyOptions<Compras>): Promise<Compras[]>;
  findOne(options: FindOneOptions<Compras>): Promise<Compras | null>;
}