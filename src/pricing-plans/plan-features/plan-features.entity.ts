import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { PricingPlan } from '../pricing-plan.entity';

@Entity()
export class PlanFeatures extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  feature: string;

  @Column({ default: 0 })
  featureOrder: number;

  @Column()
  pricingPlanId: number;

  @ManyToOne(() => PricingPlan, { onDelete: 'CASCADE' })
  pricingPlan: PricingPlan;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
