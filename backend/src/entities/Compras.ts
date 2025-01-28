import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Venda } from './Vendas';
import { Produtos } from './Produtos';

@Entity()
export class Compras {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Venda, (sale) => sale.id, { nullable: false })
  vendas!: Venda;

  @ManyToMany(() => Produtos)
  @JoinTable()
  produtos!: Produtos[];

  @Column("decimal", { precision: 10, scale: 2 })
  precoTotal!: number;

  @Column({ default: new Date() })
  createdAt!: Date;
}
