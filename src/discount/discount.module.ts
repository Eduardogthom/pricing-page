import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DiscountController } from 'src/discount/discount.controller';
import { Discount } from 'src/discount/discount.entity';
import { DiscountService } from 'src/discount/discount.service';

@Module({
  imports: [TypeOrmModule.forFeature([Discount])],
  providers: [DiscountService],
  controllers: [DiscountController],
})
export class DiscountModule {}
