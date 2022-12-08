import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanFeatures } from './plan-features/plan-features.entity';
import {
  CreateNewPricingPlanDto,
  EditNewPricingPlanDto,
} from './pricing-plan.dto';
import { PricingPlan } from './pricing-plan.entity';

@Injectable()
export class PricingPlanService {
  constructor(
    @InjectRepository(PricingPlan)
    private pricingPlanRepository: Repository<PricingPlan>,
    @InjectRepository(PlanFeatures)
    private planFeaturesRepository: Repository<PlanFeatures>,
  ) {}

  findAll(): Promise<PricingPlan[]> {
    return this.pricingPlanRepository.find();
  }

  async createPricingPlan(body: CreateNewPricingPlanDto): Promise<PricingPlan> {
    const { name, price, planFeatures } = body;
    try {
      const lastPlan = await this.pricingPlanRepository
        .createQueryBuilder('pp')
        .orderBy('planOrder', 'DESC')
        .getOne();

      const plan = this.pricingPlanRepository.create({
        name,
        price,
        planOrder: lastPlan ? lastPlan.planOrder + 1 : 1,
      });

      const pricingPlan = await this.pricingPlanRepository.save(plan);

      for (const [index, feature] of planFeatures.entries()) {
        await this.planFeaturesRepository.save({
          pricingPlan,
          feature,
          featureOrder: index + 1,
        });
      }
      const planWithFeatures = await this.pricingPlanRepository.findOne({
        where: { id: pricingPlan.id },
        relations: ['features'],
      });

      return planWithFeatures;
    } catch (error) {
      console.log(error);
    }
  }

  async deletePlan(planId: number): Promise<string> {
    const pricingPlan = await this.pricingPlanRepository.findOne({
      where: { id: planId },
    });

    if (!pricingPlan) {
      throw new NotFoundException(
        `There is no Pricing Plan with the id: ${planId} in the database`,
      );
    }

    await this.pricingPlanRepository.delete(planId);
    return `The plan: ${pricingPlan.name}, was successfully deleted`;
  }

  async editPricingPlan(
    planId: number,
    body: EditNewPricingPlanDto,
  ): Promise<PricingPlan> {
    const { name, price, planFeatures } = body;
    try {
      const pricingPlan = await this.pricingPlanRepository.findOne({
        where: { id: planId },
      });

      if (!Object.keys(body).length) {
        throw new BadRequestException('Nothing to edit here');
      }

      if (name) {
        pricingPlan.name = name;
      }

      if (price) {
        pricingPlan.price = price;
      }

      await pricingPlan.save();

      if (planFeatures) {
        await this.planFeaturesRepository
          .createQueryBuilder('pf')
          .delete()
          .from(PlanFeatures)
          .where('pricingPlanId = :planId', { planId })
          .execute();

        for (const [index, feature] of planFeatures.entries()) {
          await this.planFeaturesRepository.save({
            pricingPlan,
            feature,
            featureOrder: index + 1,
          });
        }
      }

      const planWithFeatures = await this.pricingPlanRepository.findOne({
        where: { id: pricingPlan.id },
        relations: ['features'],
      });

      return planWithFeatures;
    } catch (error) {
      console.log(error);
    }
  }
}
