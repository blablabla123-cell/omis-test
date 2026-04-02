import { PerfomanceReview } from '../generated/prisma/client.js';

export class PerfomanceUtils {
  static calculateTotalKPI(reviews: PerfomanceReview[]): number {
    const total = reviews.reduce((acc, review) => {
      return acc + review.factValue;
    }, 0);

    return total * 100;
  }
}
