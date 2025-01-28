import { Produtos } from "../entities/Produtos";

export interface IProdutoRepository {
    find(): Produtos[] | PromiseLike<Produtos[]>;
    save(newProduct: Produtos): Promise<Produtos>;
    createProduct(data: { nome: string; preco: number }): Promise<Produtos>;
    getAllProducts(): Promise<Produtos[]>;
    findBy(options: any): Promise<Produtos[]>
}