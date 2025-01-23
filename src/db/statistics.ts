import { IStatistics, StatisticsModel } from "../base/models/Statistics";

export async function StatisticPlusOne(data: (keyof IStatistics)[]) {
  await StatisticsModel.findOneAndUpdate(
    {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    },
    {
      $inc: {
        ...data.reduce((acc, key) => {
          acc[key] = 1;
          return acc;
        }, {} as Record<string, number>),
      },
    },
    {
      upsert: true,
    }
  );
}
