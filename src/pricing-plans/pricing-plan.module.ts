import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PricingPlanController } from './pricing-plan.controller';
import { PricingPlan } from './pricing-plan.entity';
import { PricingPlanService } from './pricing-plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([PricingPlan])],
  providers: [PricingPlanService],
  controllers: [PricingPlanController],
})
export class PricingPlanModule {}
