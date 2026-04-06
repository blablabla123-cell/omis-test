import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  APIResponse,
  Authentication,
  MetricByIdPipe,
  Roles,
  RolesGuard,
} from '../common/index.js';
import { MetricsService } from './metrics.service.js';
import { Metric, UserRole } from '../generated/prisma/client.js';
import { MetricDto } from './dtos/index.js';
import { JWTAuthenticationGuard } from '../common/guards/index.js';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('metrics')
@Authentication([UserRole.ADMIN])
@ApiTags('Metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @ApiOperation({ description: 'Get metric by id' })
  @ApiResponse({ status: 200, description: 'Metric fetched successfully' })
  @ApiNotFoundResponse({ description: 'Metric not found' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getMetricById(
    @Param('id', MetricByIdPipe) metric: Metric,
  ): Promise<APIResponse<Metric>> {
    return this.metricsService.getMetricById(metric);
  }

  @ApiOperation({ description: 'Get all metrics' })
  @ApiResponse({ status: 200, description: 'Metrics fetched successfully' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getMetrics(): Promise<APIResponse<Metric[]>> {
    return this.metricsService.getMetrics();
  }

  @ApiOperation({ description: 'Create metric' })
  @ApiResponse({ status: 201, description: 'Metric created successfully' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createMetric(@Body() dto: MetricDto): Promise<APIResponse<Metric>> {
    return this.metricsService.createMetric(dto);
  }

  @ApiOperation({ description: 'Update metric' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Metric updated successfully' })
  @Put(':id')
  async updateMetric(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
    @Body() dto: MetricDto,
  ): Promise<APIResponse<Metric>> {
    return this.metricsService.updateMetric(id, dto);
  }

  @ApiOperation({ description: 'Delete metric' })
  @ApiParam({ name: 'id', type: 'number', description: 'Metric id' })
  @ApiResponse({ status: 200, description: 'Metric deleted successfully' })
  @ApiResponse({ status: 404, description: 'Metric not found' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteMetric(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ): Promise<APIResponse<Metric>> {
    return this.metricsService.deleteMetric(id);
  }
}
