import { Injectable, NotFoundException } from '@nestjs/common';
import { APIResponse, APIResponseStatus } from '../common/index.js';
import { DatabaseService } from '../database/database.service.js';
import { Metric } from '../generated/prisma/client.js';
import { MetricDto } from './dtos/index.js';
import { MetricNotFoundException } from '../exceptions/index.js';

@Injectable()
export class MetricsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getMetricById(metric: Metric): Promise<APIResponse<Metric>> {
    return {
      status: APIResponseStatus.SUCCESS,
      message: 'Metric fetched successfully',
      data: metric,
    };
  }

  async createMetric(dto: MetricDto): Promise<APIResponse<Metric>> {
    const metric = await this.databaseService.metric.create({
      data: dto,
    });

    return {
      status: APIResponseStatus.SUCCESS,
      message: 'Metric created successfully',
      data: metric,
    };
  }

  async getMetrics(): Promise<APIResponse<Metric[]>> {
    const metrics = await this.databaseService.metric.findMany();

    return {
      status: APIResponseStatus.SUCCESS,
      message: 'Metrics fetched successfully',
      data: metrics,
    };
  }

  async deleteMetric(id: number): Promise<APIResponse<Metric>> {
    const metric = await this.databaseService.metric.delete({
      where: {
        id,
      },
    });

    if (!metric) {
      throw new MetricNotFoundException();
    }

    return {
      status: APIResponseStatus.SUCCESS,
      message: 'Metric deleted successfully',
      data: metric,
    };
  }

  async updateMetric(id: number, dto: MetricDto): Promise<APIResponse<Metric>> {
    const metric = await this.databaseService.metric.update({
      where: {
        id: id,
      },
      data: dto,
    });

    return {
      status: APIResponseStatus.SUCCESS,
      message: 'Metric updated successfully',
      data: metric,
    };
  }
}
