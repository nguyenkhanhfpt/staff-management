import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficesService } from './offices.service';
import { OfficesController } from './offices.controller';
import { OfficeEntity } from '@database/entities/office.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OfficeEntity])],
  controllers: [OfficesController],
  providers: [OfficesService],
  exports: [OfficesService],
})
export class OfficesModule {}
