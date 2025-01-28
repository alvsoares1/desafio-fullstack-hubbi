import { ICompraRepository } from "../repositories/ICompraRepository";
import { IProdutoRepository } from "../repositories/IProdutoRepository";
import { IVendaRepository } from "../repositories/IVendaRepository";
import { Compras } from "../entities/Compras";
import { SaleStatus } from "../enums/SaleStatus";
import { In } from "typeorm";
import { AppDataSource } from "../data-source";
import { Venda } from "../entities/Vendas";

export class CompraService {
  constructor(
    private purchaseRepository: ICompraRepository,
    private productRepository: IProdutoRepository,
    private saleRepository: IVendaRepository
  ) {}

  async purchaseUnit(saleId: number, productIds: number[]): Promise<Compras> {
    const sale = await this.saleRepository.findOne({
      where: { id: saleId },
      relations: ["produtos"],
    });

    if (!sale) throw new Error("Venda não encontrada.");
    if (sale.status !== SaleStatus.PENDING) throw new Error("Venda já processada/cancelada.");

    const productsToPurchase = await this.productRepository.findBy({ id: In(productIds) });
    if (productsToPurchase.length === 0) throw new Error("Nenhum produto encontrado.");

    const invalidProducts = productsToPurchase.filter(
      (product) => !sale.produtos.find((p) => p.id === product.id)
    );
    if (invalidProducts.length > 0) throw new Error("Produtos não pertencem à venda.");

    const purchase = new Compras();
    purchase.vendas = sale;
    purchase.produtos = productsToPurchase;
    purchase.precoTotal = productsToPurchase.reduce(
      (acc, product) => acc + product.preco,
      0
    );

    await this.purchaseRepository.save(purchase);

    const allPurchases = await this.purchaseRepository.find({
      where: { vendas: { id: saleId } },
      relations: ["produtos"],
    });

    const purchasedProductIds = allPurchases.flatMap(p => p.produtos.map(prod => prod.id));
    const allProductsPurchased = sale.produtos.every(p => purchasedProductIds.includes(p.id));

    if (allProductsPurchased) {
      sale.status = SaleStatus.COMPLETED;
      await this.saleRepository.save(sale);
    }

    return purchase;
  }

  async purchaseAllProducts(saleId: number): Promise<Compras> {
    if (isNaN(saleId) || saleId <= 0) {
      throw new Error("ID da venda inválido");
    }
  
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {
      const sale = await this.saleRepository.findOne({
        where: { id: saleId },
        relations: ["produtos"],
      });
  
      if (!sale) throw new Error("Venda não encontrada");
      if (sale.status !== SaleStatus.PENDING) throw new Error("Status inválido da venda");
      if (!sale.produtos || sale.produtos.length === 0) throw new Error("Venda sem produtos");
  
      const purchase = new Compras();
      purchase.vendas = sale;
      purchase.produtos = sale.produtos;
      purchase.precoTotal = sale.produtos.reduce(
        (acc, p) => acc + Number(p.preco), 
        0
      );
  
      sale.status = SaleStatus.COMPLETED;
  
      await queryRunner.manager.save(Compras, purchase);
      await queryRunner.manager.save(Venda, sale);
  
      await queryRunner.commitTransaction();
      return purchase;
  
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(`Falha na compra: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
    } finally {
      await queryRunner.release();
    }
  }

  async getAllPurchases(): Promise<Compras[]> {
    return this.purchaseRepository.find({ relations: ["vendas", "produtos"] });
  }
}