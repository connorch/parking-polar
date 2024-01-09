export type ParkingDataBrighton = Record<
  string,
  {
    general: {
      available_spaces: number;
      occupied_spaces: number;
      total_spaces: number;
    };
  }
>;

export type ParkingDataAlta = Record<
  string,
  {
    available_spaces: number;
    occupied_spaces: number;
    total_spaces: number;
  }
>;

export const fetchBrightonParking = async (range: {
  start: number;
  end: number;
}): Promise<ParkingDataBrighton> => {
  return fetch(
    "https://platform.honkmobile.com/graphql?honkGUID=6qqe5s3jyzdrgth1onq0qh",
    {
      headers: {
        "content-type": "application/json",
      },
      body: `{"operationName":"DetailedParkingAvailability","variables":{"id":"rrIb","startDay":${range.start},"endDay":${range.end},"year":2024},"query":"query DetailedParkingAvailability($id: ID!, $startDay: Int!, $endDay: Int!, $year: Int!) {\\n  detailedParkingAvailability(\\n    id: $id\\n    startDay: $startDay\\n    endDay: $endDay\\n    year: $year\\n  )\\n}\\n"}`,
      method: "POST",
    }
  )
    .then((res) => res.json())
    .then((res) => res.data.detailedParkingAvailability);
};

export const fetchAltaParking = async (range: {
  start: number;
  end: number;
}): Promise<ParkingDataAlta> => {
  return await fetch(
    "https://platform.honkmobile.com/graphql?honkGUID=9shhgc0pmo3w709q0v0om",
    {
      headers: {
        "content-type": "application/json",
        // "x-authentication": "b999e1b287fc4925bee46654e600c1cb",
      },
      body: `{"operationName":"ParkingAvailability","variables":{"id":"72U6","startDay":${range.start},"endDay":${range.end},"year":2024},"query":"query ParkingAvailability($id: ID!, $startDay: Int!, $endDay: Int!, $year: Int!) {\\n  parkingAvailability(id: $id, startDay: $startDay, endDay: $endDay, year: $year)\\n}\\n"}`,
      method: "POST",
    }
  )
    .then((res) => res.json())
    .then((res) => res.data.parkingAvailability);
};
