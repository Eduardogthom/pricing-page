import { Discount } from 'src/discount/discount.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { PlanFeatures } from './plan-features/plan-features.entity';

@Entity()
export class PricingPlan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  planOrder: number;

  @OneToMany(() => PlanFeatures, (feature) => feature.pricingPlan)
  features: PlanFeatures[];

  @Column()
  discountId: number;

  @ManyToOne(() => Discount)
  discount: Discount;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
