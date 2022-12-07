import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PricingPlan } from './pricing-plan.entity';

@Injectable()
export class PricingPlanService {
  constructor(
    @InjectRepository(PricingPlan)
    private pricingPlanRepository: Repository<PricingPlan>,
  ) {}

  findAll(): Promise<PricingPlan[]> {
    return this.pricingPlanRepository.find();
  }

  // findOne(id: string): Promise<PricingPlan> {
  //     return this.pricingPlanRepository.findOne(id);
  // }

  createPricingPlan(book: PricingPlan): Promise<PricingPlan> {
    return this.pricingPlanRepository.save(PricingPlan);
  }
}
