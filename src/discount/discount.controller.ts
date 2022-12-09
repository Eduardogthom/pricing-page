import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { CreateDiscountDto, EditDiscountDto } from './discount.dto';
import { Discount } from './discount.entity';
import { DiscountService } from './discount.service';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  async createPricingPlan(
    @Body(ValidationPipe) createDiscountDto: CreateDiscountDto,
  ) {
    return await this.discountService.createDiscount(createDiscountDto);
  }

  @Patch('edit')
  async editPricingPlan(
    @Body(ValidationPipe) editDiscountDto: EditDiscountDto,
  ) {
    return await this.discountService.editDiscount(editDiscountDto);
  }
}
