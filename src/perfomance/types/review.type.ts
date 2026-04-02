import { PerfomanceReview } from '../../generated/prisma/client.js';

export type Review = {
  reviews: PerfomanceReview[];
  totalKPI: number;
};
