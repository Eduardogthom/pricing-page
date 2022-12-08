import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Discount extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  discountValue: number;
}
