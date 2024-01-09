import { useQuery } from "@tanstack/react-query";
import {
  ParkingDataAlta,
  ParkingDataBrighton,
  fetchAltaParking,
  fetchBrightonParking,
} from "../api/fetch-parking";
import { useMemo } from "react";
import AudioPlayer from "react-h5-audio-player";
import { CircularProgress, Link, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

const parkingLotConfigs = {
  alta: {
    id: "alta",
    name: "Alta",
    reservationSite: "https://reserve.altaparking.com/",
    fetcher: fetchAltaParking,
    getSpacesAvailable: (data: ParkingDataAlta[string]) => {
      return data.available_spaces;
    },
  },
  brighton: {
    id: "brighton",
    name: "Brighton",
    reservationSite: "https://reservenski.parkbrightonresort.com/",
    fetcher: fetchBrightonParking,
    getSpacesAvailable: (data: ParkingDataBrighton[string]) => {
      return data.general.available_spaces;
    },
  },
};

export const CheckParkingStatus = ({
  parkingLot,
  day,
}: {
  day: Dayjs;
  parkingLot: keyof typeof parkingLotConfigs;
}) => {
  const parkingLotConfig = parkingLotConfigs[parkingLot];
  const { data, dataUpdatedAt, isFetching } = useQuery({
    queryKey: [parkingLotConfig, "brighton-parking-status"],
    queryFn: ({ queryKey }): Promise<ParkingDataAlta | ParkingDataBrighton> => {
      const config = queryKey[0];
      if (typeof config === "string") {
        throw new Error("Config is a string");
      }

      // get offset for query
      const monthOffset = day.month();
      const start = 30 * monthOffset + 1;
      const end = 30 * monthOffset + 31;

      return config.fetcher({ start, end });
    },
    refetchInterval: 10000,
  });

  const isAvailableParking = useMemo(() => {
    if (!data) {
      return false;
    }
    const dateString = day?.format("YYYY-MM-DD");
    const key = Object.keys(data).find((k) => k.startsWith(dateString));
    const dateData = key ? data[key] : undefined;
    if (!dateData) {
      throw new Error(
        "Unable to find the date.  Make sure the date string is formatted correctly and that the MONTH is correct."
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return parkingLotConfig.getSpacesAvailable(dateData as any) > 0;
  }, [data, day, parkingLotConfig]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isAvailableParking ? (
        <>
          <h2 className="rainbow rainbow_text_animated">
            PARKING AVAILABLE AT {parkingLotConfig.name.toUpperCase()}!!!
          </h2>
          <Link
            href={parkingLotConfig.reservationSite}
            target="_blank"
            rel="noopener noreferrer"
          >
            Go Reserve Fast!
          </Link>
        </>
      ) : (
        <>
          <Typography color="text.secondary" gutterBottom>
            Polling parking status for {parkingLotConfig.name}...
          </Typography>
          <Typography variant="h4" gutterBottom>
            Parking is full 😔
          </Typography>
        </>
      )}
      <Typography variant="caption">
        Last checked at <span>{dayjs(dataUpdatedAt).format("hh:mm:ssa")}</span>{" "}
        {isFetching && <CircularProgress size={9} />}
      </Typography>

      <AudioPlayer
        autoPlay={isAvailableParking}
        autoPlayAfterSrcChange
        src={isAvailableParking ? "/rolled.mp3" : undefined}
        style={{
          visibility: "hidden",
        }}
      />
    </div>
  );
};
