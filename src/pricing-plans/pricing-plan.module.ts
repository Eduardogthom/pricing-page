import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PricingPlanController } from './pricing-plan.controller';
import { PricingPlan } from './pricing-plan.entity';
import { PricingPlanService } from './pricing-plan.service';
import { PlanFeatures } from './plan-features/plan-features.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PricingPlan, PlanFeatures])],
  providers: [PricingPlanService, PricingPlanService],
  controllers: [PricingPlanController],
})
export class PricingPlanModule {}
