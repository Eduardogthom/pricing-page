import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Discount } from './discount.entity';
import { DiscountService } from './discount.service';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  // @Post()
  // async editAnuallyDiscount(@Res() response, @Body() discount: Discount) {
  //   const newPricingPlan = await this.discountService.createPlanFeatures(
  //     discount,
  //   );
  //   return response.status(HttpStatus.CREATED).json({
  //     newPricingPlan,
  //   });
  // }
}
