import { PricingPlan } from 'src/pricing-plans/pricing-plan.entity';
import { DiscountType } from 'src/pricing-plans/pricing-plan.enums';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

@Entity()
export class Discount extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  discountValue: number;

  @Column({ default: DiscountType.ANNUAL, unique: true })
  discountType: DiscountType;

  @OneToMany(() => PricingPlan, (plan) => plan.discount)
  pricingPlan: PricingPlan[];
}
