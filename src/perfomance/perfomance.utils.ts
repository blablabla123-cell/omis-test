import { Metric, PerfomanceReview } from '../generated/prisma/client.js';

export class PerfomanceUtils {
  calculateTotalKPI(
    reviews: (PerfomanceReview & { metric: Metric })[],
  ): number {
    if (reviews.length === 0) {
      return 0;
    }

    let weightedSum = 0;

    for (const review of reviews) {
      const ratio = review.factValue / review.metric.targetValue;

      const achievement = Math.min(ratio, 1);

      weightedSum += achievement * review.metric.weight;
    }

    const percent = Math.min(weightedSum * 100, 100);

    return Math.round(percent * 100) / 100;
  }
}
