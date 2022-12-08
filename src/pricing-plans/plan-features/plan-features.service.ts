import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanFeatures } from './plan-features.entity';

@Injectable()
export class PlanFeaturesService {
  constructor(
    @InjectRepository(PlanFeatures)
    private pricingPlanRepository: Repository<PlanFeatures>,
  ) {}

  findAll(): Promise<PlanFeatures[]> {
    return this.pricingPlanRepository.find();
  }

  // findOne(id: string): Promise<PricingPlan> {
  //     return this.pricingPlanRepository.findOne(id);
  // }

  createPlanFeatures(planFeatures: PlanFeatures): Promise<PlanFeatures> {
    return this.pricingPlanRepository.save(planFeatures);
  }
}
