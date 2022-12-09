import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountType } from 'src/pricing-plans/pricing-plan.enums';
import { Repository } from 'typeorm';
import { CreateDiscountDto, EditDiscountDto } from './discount.dto';
import { Discount } from './discount.entity';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
  ) {}

  async createDiscount(body: CreateDiscountDto): Promise<Discount> {
    const { discountValue, discountType } = body;

    const hasDiscountType = await this.discountRepository.findOne({
      where: {
        discountType: discountType ? discountType : DiscountType.ANNUAL,
      },
    });

    if (hasDiscountType) {
      throw new ConflictException(
        discountType
          ? 'There is already a discount with this type in the database'
          : 'There is already a default annualy discount in the database',
      );
    }

    const discountData = this.discountRepository.create({
      discountValue,
      discountType,
    });

    const createdDiscount = await this.discountRepository.save(discountData);

    return createdDiscount;
  }

  async editDiscount(body: EditDiscountDto): Promise<Discount> {
    const { discountType, discountValue } = body;
    const discount = await this.discountRepository.findOne({
      where: {
        discountType: discountType ? discountType : DiscountType.ANNUAL,
      },
    });

    if (!discount) {
      throw new NotFoundException(
        `There is no discount with the type: ${discountType} in the database`,
      );
    }

    discount.discountValue = discountValue;
    await discount.save();

    return discount;
  }
}
