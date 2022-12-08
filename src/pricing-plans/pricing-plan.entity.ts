import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PlanFeatures } from './plan-features/plan-features.entity';
import { PlanOrderEnum } from './pricing-plan.enums';

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
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
