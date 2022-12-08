import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateNewPricingPlanDto,
  EditNewPricingPlanDto,
} from './pricing-plan.dto';
import { PricingPlan } from './pricing-plan.entity';

import { PricingPlanService } from './pricing-plan.service';

@Controller('pricing-plans')
export class PricingPlanController {
  constructor(private readonly pricingPlanService: PricingPlanService) {}

  @Post()
  async createPricingPlan(
    @Body(ValidationPipe) createNewPricingPlanDto: CreateNewPricingPlanDto,
  ) {
    return await this.pricingPlanService.createPricingPlan(
      createNewPricingPlanDto,
    );
  }

  @Delete(':planId')
  async deletePlan(@Param('planId') planId: number) {
    return await this.pricingPlanService.deletePlan(planId);
  }

  @Patch('edit/:planId')
  async editPricingPlan(
    @Param('planId') planId: number,
    @Body(ValidationPipe) editNewPricingPlanDto: EditNewPricingPlanDto,
  ) {
    return await this.pricingPlanService.editPricingPlan(
      planId,
      editNewPricingPlanDto,
    );
  }
}
