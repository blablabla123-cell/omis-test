import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Metric } from '../../generated/prisma/client.js';
import { DatabaseService } from '../../database/database.service.js';
import { MetricNotFoundException } from '../../exceptions/index.js';

@Injectable()
export class MetricByIdPipe implements PipeTransform {
  constructor(private readonly databaseService: DatabaseService) {}
  async transform(value: string, metadata: ArgumentMetadata): Promise<Metric> {
    const metric = await this.databaseService.metric.findUnique({
      where: { id: Number(value) },
    });
    if (metric) {
      return metric;
    }
    throw new MetricNotFoundException();
  }
}
