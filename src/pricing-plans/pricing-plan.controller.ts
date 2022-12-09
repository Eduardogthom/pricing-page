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
import { PlanFeaturesService } from './plan-features/plan-features.service';
import {
  CreateNewPricingPlanDto,
  CreatePlanFeaturesDto,
  EditNewPricingPlanDto,
  EditPlanFeaturesDto,
} from './pricing-plan.dto';
import { PricingPlan } from './pricing-plan.entity';

import { PricingPlanService } from './pricing-plan.service';

@Controller('pricing-plans')
export class PricingPlanController {
  constructor(
    private readonly pricingPlanService: PricingPlanService,
    private readonly planFeaturesService: PlanFeaturesService,
  ) {}

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

  @Get()
  async getAllPlans() {
    return await this.pricingPlanService.getAllPlans();
  }

  @Get('/:planId')
  async getSinglePlan(@Param('planId') planId: number) {
    return await this.pricingPlanService.getSinglePlan(planId);
  }

  @Post('/features/:planId')
  async createPlanFeatures(
    @Param('planId') planId: number,
    @Body(ValidationPipe) createPlanFeaturesDto: CreatePlanFeaturesDto,
  ) {
    return await this.planFeaturesService.createPlanFeatures(
      planId,
      createPlanFeaturesDto,
    );
  }

  @Patch('/features/edit/')
  async editPlanFeatures(
    @Body(ValidationPipe) editPlanFeaturesDto: EditPlanFeaturesDto,
  ) {
    return await this.planFeaturesService.editPlanFeatures(editPlanFeaturesDto);
  }

  @Delete('/features/:featureId')
  async deletePlanFeature(@Param('featureId') featureId: number) {
    return await this.planFeaturesService.deletePlanFeature(featureId);
  }
}
