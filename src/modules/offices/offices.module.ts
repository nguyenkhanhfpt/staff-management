import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficesService } from './offices.service';
import { OfficesController } from './offices.controller';
import { OfficeEntity } from '@database/entities/office.entity';
import { OfficeResolver } from './office.resolver';
import { OfficeResolverService } from './office-resolver.service';

@Module({
  imports: [TypeOrmModule.forFeature([OfficeEntity])],
  controllers: [OfficesController],
  providers: [OfficesService, OfficeResolver, OfficeResolverService],
  exports: [OfficesService],
})
export class OfficesModule {}
