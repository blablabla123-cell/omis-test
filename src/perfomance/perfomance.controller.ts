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
import { PerfomanceReview, UserRole } from '../generated/prisma/client.js';
import { PerfomanceReviewDto } from './dtos/perfomance-review.dto.js';
import { PerfomanceService } from './perfomance.service.js';

@Controller('perfomance')
export class PerfomanceController {
  constructor(private readonly perfomanceService: PerfomanceService) {}

  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.ADMIN)
  @Post('reviews')
  async createReview(
    @Body() dto: PerfomanceReviewDto,
  ): Promise<APIResponse<PerfomanceReview>> {
    return this.perfomanceService.createReview(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN)
  @Get('reviews')
  async getReviews(@Param('userId') userId: string) {
    return this.perfomanceService.getReviews(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN)
  @Put('reviews')
  async updateReview(@Body() dto: PerfomanceReviewDto) {
    return this.perfomanceService.updateReview(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN)
  @Delete('reviews')
  async deleteReview(@Param('reviewId') reviewId: string) {
    return this.perfomanceService.deleteReview(Number(reviewId));
  }

  @HttpCode(HttpStatus.OK)
  @Get('my-perfomance')
  async getMyPerfomance() {}
}
