import { ArrayMinSize, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { EditPlanArray } from './plan-features/plan-features.interface';

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

export class EditNewPricingPlanDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsInt()
  price: number;

  @IsOptional()
  planFeatures: string[];
}

export class CreatePlanFeaturesDto {
  @IsNotEmpty()
  @ArrayMinSize(1)
  features: string[];
}

export class EditPlanFeaturesDto {
  @IsNotEmpty()
  @ArrayMinSize(1)
  features: EditPlanArray[];
}

export class ChangePlanOrderDto {
  @IsNotEmpty()
  @IsInt()
  newPosition: number;
}
