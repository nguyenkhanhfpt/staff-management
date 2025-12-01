import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { OfficesService } from './offices.service';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ApiErrorsResponse, ApiGetErrorsResponse } from '@decorators';

@ApiBearerAuth()
@ApiTags('Offices')
@Controller('offices')
export class OfficesController {
  constructor(private readonly officesService: OfficesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new office' })
  @ApiResponse({
    status: 201,
    description: 'Office has been successfully created.',
  })
  @ApiErrorsResponse()
  create(@Body() createOfficeDto: CreateOfficeDto) {
    return this.officesService.create(createOfficeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all offices' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all offices with staff information.',
  })
  @ApiGetErrorsResponse()
  findAll() {
    return this.officesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an office by ID' })
  @ApiParam({
    name: 'id',
    description: 'Office ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the office with the specified ID.',
  })
  @ApiGetErrorsResponse()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.officesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an office' })
  @ApiParam({
    name: 'id',
    description: 'Office ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Office has been successfully updated.',
  })
  @ApiErrorsResponse()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOfficeDto: UpdateOfficeDto,
  ) {
    return this.officesService.update(id, updateOfficeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an office' })
  @ApiParam({
    name: 'id',
    description: 'Office ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Office has been successfully deleted.',
  })
  @ApiGetErrorsResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.officesService.remove(id);
  }
}
