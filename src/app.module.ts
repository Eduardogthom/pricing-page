import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Discount } from './discount/discount.entity';
import { DiscountModule } from './discount/discount.module';
import { PlanFeatures } from './pricing-plans/plan-features/plan-features.entity';
import { PricingPlan } from './pricing-plans/pricing-plan.entity';
import { PricingPlanModule } from './pricing-plans/pricing-plan.module';

const entities = [PricingPlan, PlanFeatures, Discount];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: entities,
      synchronize: true,
    }),
    PricingPlanModule,
    DiscountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
