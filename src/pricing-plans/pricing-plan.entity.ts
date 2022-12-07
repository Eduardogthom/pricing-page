import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlanOrders } from './pricing-plan.enums';

@Entity()
export class PricingPlan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column({
    type: 'enum',
    enum: PlanOrders,
    default: PlanOrders.LAST,
  })
  planOrder: PlanOrders;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
