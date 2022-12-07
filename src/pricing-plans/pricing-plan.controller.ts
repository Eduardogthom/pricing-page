import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { PricingPlan } from './pricing-plan.entity';

import { PricingPlanService } from './pricing-plan.service';

@Controller('pricing-plans')
export class PricingPlanController {
  constructor(private readonly pricingPlanService: PricingPlanService) {}

  @Post()
  async createPricingPlan(@Res() response, @Body() pricingPlan: PricingPlan) {
    const newPricingPlan = await this.pricingPlanService.createPricingPlan(
      pricingPlan,
    );
    return response.status(HttpStatus.CREATED).json({
      newPricingPlan,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const pricingPlans = await this.pricingPlanService.findAll();
    return response.status(HttpStatus.OK).json({
      pricingPlans,
    });
  }

  // @Get('/:id')
  // async findById(@Res() response, @Param('id') id) {
  //     const book = await this.pricingPlanService.findOne(id);
  //     return response.status(HttpStatus.OK).json({
  //         book
  //     })
  // }
}
