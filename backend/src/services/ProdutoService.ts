import { Produtos } from '../entities/Produtos';
import { IProdutoRepository } from '../repositories/IProdutoRepository';

export class ProdutoService {
  constructor(private ProductRepository: IProdutoRepository) {}

  async createProduct(nome: string, preco: number): Promise<Produtos> {
    const newProduct = await this.ProductRepository.createProduct({ nome, preco });
    await this.ProductRepository.save(newProduct);
    return newProduct;
}



  async getAllProducts(): Promise<Produtos[]> {
    return this.ProductRepository.find();
  }
}
