import { Venda } from "../entities/Vendas";
import { SaleStatus } from "../enums/SaleStatus";
import { Produtos } from "../entities/Produtos";
import { FindManyOptions, FindOneOptions } from "typeorm";

export interface IVendaRepository {
    createSale(data: {produtos: Produtos[];
        precoTotal: number;
        status: SaleStatus;}): Promise<Venda>;
    save(sale: Venda): Promise<Venda>;
    getAllSales(): Promise<Venda[]>;
    find(options?: FindManyOptions<Venda>): Promise<Venda[]>;
    findOne(options: FindOneOptions<Venda>): Promise<Venda | null>;
}