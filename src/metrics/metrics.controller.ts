import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { APIResponse, Roles, RolesGuard } from '../common/index.js';
import { MetricsService } from './metrics.service.js';
import { Metric, UserRole } from '../generated/prisma/client.js';
import { MetricDto } from './dtos/index.js';
import { JWTAuthenticationGuard } from '../authentication/guards/index.js';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('metrics')
@UseGuards(JWTAuthenticationGuard, RolesGuard)
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 403, description: 'Forbidden' })
@Roles(UserRole.ADMIN)
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @ApiResponse({ status: 200, description: 'Metrics fetched successfully' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getMetrics(): Promise<APIResponse<Metric[]>> {
    return this.metricsService.getMetrics();
  }

  @ApiResponse({ status: 201, description: 'Metric created successfully' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createMetric(@Body() dto: MetricDto): Promise<APIResponse<Metric>> {
    return this.metricsService.createMetric(dto);
  }

  @ApiResponse({ status: 200, description: 'Metric deleted successfully' })
  @ApiResponse({ status: 404, description: 'Metric not found' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteMetric(@Param('id') id: string): Promise<APIResponse<Metric>> {
    return this.metricsService.deleteMetric(Number(id));
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Metric updated successfully' })
  @Put()
  async updateMetric(@Body() dto: MetricDto): Promise<APIResponse<Metric>> {
    return this.metricsService.updateMetric(dto);
  }
}
