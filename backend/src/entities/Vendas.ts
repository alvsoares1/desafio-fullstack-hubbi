import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Produtos } from './Produtos';
import { SaleStatus } from '../enums/SaleStatus';

@Entity()
export class Venda {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToMany(() => Produtos)
  @JoinTable()
  produtos!: Produtos[];

  @Column("decimal", { precision: 10, scale: 2 })
  precoTotal!: number;

  @Column({type: "enum", enum: SaleStatus, default: SaleStatus.PENDING})
  status!: SaleStatus;
}
