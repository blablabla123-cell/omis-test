import { NotFoundException } from '@nestjs/common';

export class MetricNotFoundException extends NotFoundException {
    constructor() {
        super('Metric not found');
    }
}