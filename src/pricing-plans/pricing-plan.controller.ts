import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNewPricingPlanDto } from './pricing-plan.dto';
import { PricingPlan } from './pricing-plan.entity';

import { PricingPlanService } from './pricing-plan.service';

@Controller('pricing-plans')
export class PricingPlanController {
  constructor(private readonly pricingPlanService: PricingPlanService) {}

  @Post()
  async createPricingPlan(
    @Body(ValidationPipe) createNewPricingPlanDto: CreateNewPricingPlanDto,
  ) {
    return this.pricingPlanService.createPricingPlan(createNewPricingPlanDto);
  }

  @Delete(':planId')
  async deletePlan(@Param('planId') planId: number) {
    return this.pricingPlanService.deletePlan(planId);
  }
}
