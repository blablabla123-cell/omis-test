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
} from '@nestjs/common';
import { APIResponse, Roles } from '../common/index.js';
import { MetricsService } from './metrics.service.js';
import { Metric, UserRole } from '../generated/prisma/client.js';
import { MetricDto } from './dtos/index.js';

@Controller('metrics')
@Roles(UserRole.ADMIN)
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getMetrics(): Promise<APIResponse<Metric[]>> {
    return this.metricsService.getMetrics();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createMetric(@Body() dto: MetricDto): Promise<APIResponse<Metric>> {
    return this.metricsService.createMetric(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete()
  async deleteMetric(@Param('id') id: string): Promise<APIResponse<Metric>> {
    return this.metricsService.deleteMetric(Number(id));
  }

  @HttpCode(HttpStatus.OK)
  @Put()
  async updateMetric(@Body() dto: MetricDto): Promise<APIResponse<Metric>> {
    return this.metricsService.updateMetric(dto);
  }
}
