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
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ApiErrorsResponse, ApiGetErrorsResponse } from '@decorators';

@ApiBearerAuth()
@ApiTags('Departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new department' })
  @ApiResponse({
    status: 201,
    description: 'Department has been successfully created.',
  })
  @ApiErrorsResponse()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all departments' })
  @ApiResponse({
    status: 200,
    description:
      'Returns a list of all departments with hierarchical structure.',
  })
  @ApiGetErrorsResponse()
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get('root')
  @ApiOperation({ summary: 'Get all root departments' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all root departments (without parent).',
  })
  @ApiGetErrorsResponse()
  findAllRoot() {
    return this.departmentsService.findAllRoot();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a department by ID' })
  @ApiParam({
    name: 'id',
    description: 'Department ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the department with the specified ID.',
  })
  @ApiGetErrorsResponse()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.findOne(id);
  }

  @Get(':id/with-staff')
  @ApiOperation({ summary: 'Get a department by ID with staff members' })
  @ApiParam({
    name: 'id',
    description: 'Department ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns the department with the specified ID including all staff members.',
  })
  @ApiGetErrorsResponse()
  findWithStaff(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.findWithStaff(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a department' })
  @ApiParam({
    name: 'id',
    description: 'Department ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Department has been successfully updated.',
  })
  @ApiErrorsResponse()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentsService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a department' })
  @ApiParam({
    name: 'id',
    description: 'Department ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Department has been successfully deleted.',
  })
  @ApiGetErrorsResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.remove(id);
  }
}
