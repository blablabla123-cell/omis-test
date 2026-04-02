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
import { APIResponse, GetUser, Roles, RolesGuard } from '../common/index.js';
import {
  PerfomanceReview,
  User,
  UserRole,
} from '../generated/prisma/client.js';
import { PerfomanceReviewDto } from './dtos/perfomance-review.dto.js';
import { PerfomanceService } from './perfomance.service.js';
import { JWTPayload } from '../authentication/types/index.js';
import { JWTAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard.js';
import { Review } from './types/review.type.js';
import { LoggerService } from '../logger/logger.service.js';
import { ApiResponse } from '@nestjs/swagger';

@Controller('perfomance')
@UseGuards(JWTAuthenticationGuard, RolesGuard)
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 403, description: 'Forbidden' })
export class PerfomanceController {
  constructor(private readonly perfomanceService: PerfomanceService) {}

  @ApiResponse({ status: 200, description: 'Review fetched successfully' })
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get('my-perfomance')
  async getMyPerfomance(
    @GetUser() payload: User,
  ): Promise<APIResponse<Review>> {
    return this.perfomanceService.getMyPerfomance(payload.id);
  }

  @ApiResponse({ status: 200, description: 'Reviews fetched successfully' })
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  async getReviews(
    @Param('id') userId: string,
  ): Promise<APIResponse<PerfomanceReview[]>> {
    return this.perfomanceService.getReviews(userId);
  }

  @ApiResponse({ status: 201, description: 'Review created successfully' })
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.ADMIN)
  @Post()
  async createReview(
    @Body() dto: PerfomanceReviewDto,
  ): Promise<APIResponse<PerfomanceReview>> {
    return this.perfomanceService.createReview(dto);
  }

  @ApiResponse({ status: 200, description: 'Review updated successfully' })
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN)
  @Put()
  async updateReview(
    @Body() dto: PerfomanceReviewDto,
  ): Promise<APIResponse<PerfomanceReview>> {
    return this.perfomanceService.updateReview(dto);
  }

  @ApiResponse({ status: 200, description: 'Review deleted successfully' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteReview(
    @Param('id') reviewId: string,
  ): Promise<APIResponse<PerfomanceReview>> {
    return this.perfomanceService.deleteReview(Number(reviewId));
  }
}
