import { ArrayMinSize, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { DiscountType } from 'src/pricing-plans/pricing-plan.enums';

export class CreateDiscountDto {
  @IsNotEmpty()
  @IsInt()
  discountValue: number;

  @IsOptional()
  discountType: DiscountType;
}

export class EditDiscountDto {
  @IsNotEmpty()
  discountType: DiscountType;

  @IsNotEmpty()
  @IsInt()
  discountValue: number;
}
