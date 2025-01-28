import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";

@Entity()
export class Produtos {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  preco!: number;
}
