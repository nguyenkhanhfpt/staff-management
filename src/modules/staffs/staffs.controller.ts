import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ApiErrorsResponse, ApiGetErrorsResponse } from '@decorators';
import { GetStaffPostsResDto } from './dto/get-staff-posts-res.dto';
import { Serialize } from '@interceptors';
import { CreateStaffInfoDto } from './dto/create-staff-info.dto';
import { UpdateStaffInfoDto } from './dto/update-staff-info.dto';
import { AssignDepartmentsDto } from '../departments/dto/assign-departments.dto';

@ApiBearerAuth()
@ApiTags('Staffs')
@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new staff' })
  @ApiResponse({
    status: 201,
    description: 'Staff has been successfully created.',
  })
  @ApiErrorsResponse()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.create(createStaffDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all staffs' })
  @ApiResponse({ status: 200, description: 'Returns a list of all staffs.' })
  @ApiGetErrorsResponse()
  async findAll() {
    return this.staffsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a staff by ID' })
  @ApiParam({
    name: 'id',
    description: 'Staff ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the staff with the specified ID.',
  })
  @ApiGetErrorsResponse()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.staffsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a staff' })
  @ApiParam({
    name: 'id',
    description: 'Staff ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Staff has been successfully updated.',
  })
  @ApiErrorsResponse()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStaffDto: UpdateStaffDto,
  ) {
    return this.staffsService.update(id, updateStaffDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a staff' })
  @ApiParam({
    name: 'id',
    description: 'Staff ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Staff has been successfully deleted.',
  })
  @ApiGetErrorsResponse()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.staffsService.remove(id);
  }

  @Get(':id/posts')
  @ApiOperation({ summary: 'Get all posts by staff' })
  @ApiParam({
    name: 'id',
    description: 'Staff ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all posts by staff.',
    type: [GetStaffPostsResDto],
  })
  @ApiGetErrorsResponse()
  @Serialize(GetStaffPostsResDto)
  async findAllPosts(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GetStaffPostsResDto[]> {
    return this.staffsService.findAllPosts(id);
  }

  // Staff Info endpoints

  @Post(':id/info')
  @ApiOperation({ summary: 'Create staff info' })
  @ApiParam({
    name: 'id',
    description: 'Staff ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 201,
    description: 'Staff info has been successfully created.',
  })
  @ApiErrorsResponse()
  createStaffInfo(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createStaffInfoDto: CreateStaffInfoDto,
  ) {
    // Ensure the staffId matches the URL parameter
    createStaffInfoDto.staffId = id;
    return this.staffsService.createStaffInfo(createStaffInfoDto);
  }

  @Get(':id/info')
  @ApiOperation({ summary: 'Get staff info' })
  @ApiParam({
    name: 'id',
    description: 'Staff ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the staff info.',
  })
  @ApiGetErrorsResponse()
  getStaffInfo(@Param('id', ParseUUIDPipe) id: string) {
    return this.staffsService.getStaffInfo(id);
  }

  @Patch(':id/info')
  @ApiOperation({ summary: 'Update staff info' })
  @ApiParam({
    name: 'id',
    description: 'Staff ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Staff info has been successfully updated.',
  })
  @ApiErrorsResponse()
  updateStaffInfo(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStaffInfoDto: UpdateStaffInfoDto,
  ) {
    return this.staffsService.updateStaffInfo(id, updateStaffInfoDto);
  }

  @Delete(':id/info')
  @ApiOperation({ summary: 'Delete staff info' })
  @ApiParam({
    name: 'id',
    description: 'Staff ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Staff info has been successfully deleted.',
  })
  @ApiGetErrorsResponse()
  deleteStaffInfo(@Param('id', ParseUUIDPipe) id: string) {
    return this.staffsService.deleteStaffInfo(id);
  }

  // Department assignment endpoints

  @Post(':id/departments')
  @ApiOperation({ summary: 'Assign departments to staff' })
  @ApiParam({
    name: 'id',
    description: 'Staff ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 201,
    description: 'Departments have been successfully assigned to staff.',
  })
  @ApiErrorsResponse()
  assignDepartments(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() assignDepartmentsDto: AssignDepartmentsDto,
  ) {
    return this.staffsService.assignDepartments(
      id,
      assignDepartmentsDto.departmentIds,
      assignDepartmentsDto.defaultDepartmentId,
    );
  }

  @Get(':id/departments')
  @ApiOperation({ summary: 'Get staff departments' })
  @ApiParam({
    name: 'id',
    description: 'Staff ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all departments assigned to the staff.',
  })
  @ApiGetErrorsResponse()
  getStaffDepartments(@Param('id', ParseUUIDPipe) id: string) {
    return this.staffsService.getStaffDepartments(id);
  }

  @Patch(':id/departments/:departmentId/default')
  @ApiOperation({ summary: 'Set department as default for staff' })
  @ApiParam({
    name: 'id',
    description: 'Staff ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'departmentId',
    description: 'Department ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Department has been set as default.',
  })
  @ApiErrorsResponse()
  setDefaultDepartment(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('departmentId', ParseIntPipe) departmentId: number,
  ) {
    return this.staffsService.setDefaultDepartment(id, departmentId);
  }

  @Delete(':id/departments/:departmentId')
  @ApiOperation({ summary: 'Remove department assignment from staff' })
  @ApiParam({
    name: 'id',
    description: 'Staff ID (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'departmentId',
    description: 'Department ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Department assignment has been removed.',
  })
  @ApiErrorsResponse()
  removeDepartmentAssignment(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('departmentId', ParseIntPipe) departmentId: number,
  ) {
    return this.staffsService.removeDepartmentAssignment(id, departmentId);
  }
}
