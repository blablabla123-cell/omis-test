import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { PerfomanceReview } from '../generated/prisma/client.js';
import { APIResponse, APIResponseStatus } from '../common/index.js';
import { PerfomanceReviewDto } from './dtos/perfomance-review.dto.js';
import { Review } from './types/review.type.js';
import { PerfomanceUtils } from './perfomance.utils.js';

@Injectable()
export class PerfomanceService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly perfomanceUtils: PerfomanceUtils,
  ) {}

  async createReview(
    dto: PerfomanceReviewDto,
  ): Promise<APIResponse<PerfomanceReview>> {
    const perfomanceReview = await this.databaseService.perfomanceReview.create(
      {
        data: {
          ...dto,
          period: new Date(dto.period),
        },
      },
    );

    return {
      status: APIResponseStatus.SUCCESS,
      message: 'Perfomance review created successfully',
      data: perfomanceReview,
    };
  }

  async getReviews(id: string): Promise<APIResponse<PerfomanceReview[]>> {
    const getReviews = await this.databaseService.perfomanceReview.findMany({
      where: {
        userId: id,
      },
    });

    return {
      status: APIResponseStatus.SUCCESS,
      message: 'Reviews fetched successfully',
      data: getReviews,
    };
  }

  async updateReview(
    id: number,
    dto: PerfomanceReviewDto,
  ): Promise<APIResponse<PerfomanceReview>> {
    const updatedReview = await this.databaseService.perfomanceReview.update({
      where: {
        id,
      },
      data: {
        ...dto,
        period: new Date(dto.period),
      },
    });

    return {
      status: APIResponseStatus.SUCCESS,
      message: 'Review updated successfully',
      data: updatedReview,
    };
  }

  async deleteReview(reviewId: number): Promise<APIResponse<PerfomanceReview>> {
    const deletedReview = await this.databaseService.perfomanceReview.delete({
      where: {
        id: reviewId,
      },
    });

    if (!deletedReview) {
      throw new NotFoundException('Review not found');
    }

    return {
      status: APIResponseStatus.SUCCESS,
      message: 'Review deleted successfully',
      data: deletedReview,
    };
  }

  async getMyPerfomance(userId: string): Promise<APIResponse<Review>> {
    const reviews = await this.databaseService.perfomanceReview.findMany({
      where: {
        userId,
      },
      include: {
        metric: true,
      },
    });

    const totalKPI = this.perfomanceUtils.calculateTotalKPI(reviews);

    return {
      status: APIResponseStatus.SUCCESS,
      message: 'Perfomance fetched successfully',
      data: {
        reviews,
        totalKPI,
      },
    };
  }
}
