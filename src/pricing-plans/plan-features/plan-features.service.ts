import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ChangeOrderDto,
  CreatePlanFeaturesDto,
  EditPlanFeaturesDto,
} from '../pricing-plan.dto';
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

  async editPlanFeatures(body: EditPlanFeaturesDto): Promise<PlanFeatures[]> {
    const { features } = body;

    let editedFeatures: PlanFeatures[] = [];

    for (const feature of features) {
      const toBeEdited = await this.planFeaturesRepository.findOne({
        where: { id: feature.featureId },
      });

      if (!toBeEdited) continue;

      toBeEdited.feature = feature.featureName;

      editedFeatures.push(toBeEdited);
      await toBeEdited.save();
    }

    if (editedFeatures.length === 0) {
      throw new NotFoundException(
        `Any of those plans were found, nothing has changed in the database`,
      );
    }

    return editedFeatures;
  }

  async deletePlanFeature(featureId: number): Promise<string> {
    const planFeature = await this.planFeaturesRepository.findOne({
      where: { id: featureId },
    });

    if (!planFeature) {
      throw new NotFoundException(
        `There is no Feature with the id: ${featureId} in the database`,
      );
    }

    await this.planFeaturesRepository.delete(featureId);

    const allFeatures = await this.planFeaturesRepository.find({
      where: { pricingPlanId: planFeature.pricingPlanId },
      order: { featureOrder: 'ASC' },
    });

    for (const [index, feature] of allFeatures.entries()) {
      feature.featureOrder = index + 1;
      await feature.save();
    }

    return `The feature: ${planFeature.feature}, was successfully deleted`;
  }

  async changeFeaturePosition(
    featureId: number,
    data: ChangeOrderDto,
  ): Promise<PlanFeatures> {
    const { newPosition } = data;

    if (newPosition < 1) {
      throw new BadRequestException(`The new position must have a valid value`);
    }

    const feature = await this.planFeaturesRepository.findOne({
      where: { id: featureId },
    });

    if (feature.featureOrder === newPosition) {
      throw new BadRequestException(`The feature is already in this position`);
    }

    const pricingPlan = await this.pricingPlanRepository
      .createQueryBuilder('pp')
      .leftJoinAndSelect('pp.features', 'pf')
      .where('pp.id = :planId', { planId: feature.pricingPlanId })
      .orderBy('pf.featureOrder', 'ASC')
      .getOne();

    let finalPosition =
      pricingPlan.features[pricingPlan.features.length - 1].featureOrder;

    if (newPosition > finalPosition) {
      throw new BadRequestException(
        `The new position is higher than the last position in the database`,
      );
    }

    for (const planFeature of pricingPlan.features) {
      if (planFeature.featureOrder === newPosition) {
        planFeature.featureOrder = feature.featureOrder;
        await planFeature.save();
      }
    }

    feature.featureOrder = newPosition;
    await feature.save();

    return feature;
  }
}
