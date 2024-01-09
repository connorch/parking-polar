import { sleep } from "../utils";

export type ParkingData = Record<
  string,
  {
    general: {
      available_spaces: number;
      occupied_spaces: number;
      total_spaces: number;
    };
  }
>;

const MONTH_OFFSET = 2;

export const fetchBrightonParking = async (): Promise<ParkingData> => {
  const startDateParam = 30 * MONTH_OFFSET + 1;
  const endDateParam = 30 * MONTH_OFFSET + 31;

  await sleep(5000);
  return fetch(
    "https://platform.honkmobile.com/graphql?honkGUID=6qqe5s3jyzdrgth1onq0qh",
    {
      headers: {
        "content-type": "application/json",
      },
      body: `{"operationName":"DetailedParkingAvailability","variables":{"id":"rrIb","startDay":${startDateParam},"endDay":${endDateParam},"year":2024},"query":"query DetailedParkingAvailability($id: ID!, $startDay: Int!, $endDay: Int!, $year: Int!) {\\n  detailedParkingAvailability(\\n    id: $id\\n    startDay: $startDay\\n    endDay: $endDay\\n    year: $year\\n  )\\n}\\n"}`,
      method: "POST",
    }
  )
    .then((res) => res.json())
    .then((res) => res.data.detailedParkingAvailability);
};
