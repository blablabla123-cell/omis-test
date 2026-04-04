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
} from '@nestjs/common';
import {
  APIResponse,
  Authentication,
  GetUser,
  Roles,
  RolesGuard,
} from '../common/index.js';
import {
  PerfomanceReview,
  User,
  UserRole,
} from '../generated/prisma/client.js';
import { PerfomanceReviewDto } from './dtos/perfomance-review.dto.js';
import { PerfomanceService } from './perfomance.service.js';
import { JWTAuthenticationGuard } from '../common/guards/jwt-authentication.guard.js';
import { Review } from './types/review.type.js';
import { ApiResponse } from '@nestjs/swagger';

@Controller('perfomance')
@Authentication(UserRole.ADMIN)
export class PerfomanceController {
  constructor(private readonly perfomanceService: PerfomanceService) {}

  @ApiResponse({ status: 200, description: 'Review fetched successfully' })
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get('my-perfomance')
  async getMyPerfomance(
    @GetUser('ID') userId: string,
  ): Promise<APIResponse<Review>> {
    return this.perfomanceService.getMyPerfomance(userId);
  }

  @ApiResponse({ status: 200, description: 'Reviews fetched successfully' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getReviews(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: string,
  ): Promise<APIResponse<PerfomanceReview[]>> {
    return this.perfomanceService.getReviews(id);
  }

  @ApiResponse({ status: 201, description: 'Review created successfully' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createReview(
    @Body() dto: PerfomanceReviewDto,
  ): Promise<APIResponse<PerfomanceReview>> {
    return this.perfomanceService.createReview(dto);
  }

  @ApiResponse({ status: 200, description: 'Review updated successfully' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async updateReview(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
    @Body() dto: PerfomanceReviewDto,
  ): Promise<APIResponse<PerfomanceReview>> {
    return this.perfomanceService.updateReview(id, dto);
  }

  @ApiResponse({ status: 200, description: 'Review deleted successfully' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteReview(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ): Promise<APIResponse<PerfomanceReview>> {
    return this.perfomanceService.deleteReview(id);
  }
}
