import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlanFeaturesDto } from '../pricing-plan.dto';
import { PricingPlan } from '../pricing-plan.entity';
import { PlanFeatures } from './plan-features.entity';

@Injectable()
export class PlanFeaturesService {
  constructor(
    @InjectRepository(PricingPlan)
    private pricingPlanRepository: Repository<PricingPlan>,
    @InjectRepository(PlanFeatures)
    private planFeaturesRepository: Repository<PlanFeatures>,
  ) {}

  async createPlanFeatures(
    planId: number,
    planFeatures: CreatePlanFeaturesDto,
  ): Promise<PlanFeatures[]> {
    const pricingPlan = await this.pricingPlanRepository.findOne({
      where: { id: planId },
    });

    if (!pricingPlan) {
      throw new NotFoundException(
        `There is no Pricing Plan with the id: ${planId} in the database`,
      );
    }

    const orderedFeatures = await this.planFeaturesRepository.find({
      where: { pricingPlanId: planId },
      order: { featureOrder: 'DESC' },
    });

    for (const [index, feature] of planFeatures.features.entries()) {
      let planOrder =
        orderedFeatures.length > 0
          ? orderedFeatures[0].featureOrder + index + 1
          : index + 1;
      await this.planFeaturesRepository.save({
        pricingPlan,
        feature,
        featureOrder: planOrder,
      });
    }

    const newFeatures = await this.planFeaturesRepository.find({
      where: { pricingPlanId: planId },
      order: { featureOrder: 'DESC' },
    });

    return newFeatures;
  }
}
