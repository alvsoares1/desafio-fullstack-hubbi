import { IProdutoRepository } from "./IProdutoRepository";
import { AppDataSource } from "../data-source";
import { Produtos } from "../entities/Produtos";

export class ProdutoRepository implements IProdutoRepository {
    private productRepository = AppDataSource.getRepository(Produtos);

    async createProduct(data: { nome: string; preco: number }): Promise<Produtos> {
        const newProduct = this.productRepository.create(data); 
        return newProduct;
    }
    

    async getAllProducts(): Promise<Produtos[]> {
        return this.productRepository.find();
    }

    async save(newProduct: Produtos): Promise<Produtos> {
        return this.productRepository.save(newProduct); 
    }
    

    async find(): Promise<Produtos[]> {
        return this.productRepository.find();
    }

    async findBy(options: any): Promise<Produtos[]> {
        return this.productRepository.findBy(options);
    }
}