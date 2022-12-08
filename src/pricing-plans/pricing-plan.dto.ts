import { ArrayMinSize, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { PlanOrderEnum } from './pricing-plan.enums';

export class CreateNewPricingPlanDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsNotEmpty()
  @ArrayMinSize(1)
  planFeatures: string[];
}
