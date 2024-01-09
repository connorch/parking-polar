import { useQuery } from "@tanstack/react-query";
import {
  ParkingDataAlta,
  ParkingDataBrighton,
  fetchAltaParking,
  fetchBrightonParking,
} from "../api/fetch-parking";
import { useMemo } from "react";
import AudioPlayer from "react-h5-audio-player";
import { Link } from "@mui/material";

const DATES_TO_CHECK = ["2024-01-27"] as const;

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
}: {
  parkingLot: keyof typeof parkingLotConfigs;
}) => {
  const parkingLotConfig = parkingLotConfigs[parkingLot];
  const { data, dataUpdatedAt } = useQuery({
    queryKey: [parkingLotConfig, "brighton-parking-status"],
    queryFn: ({ queryKey }): Promise<ParkingDataAlta | ParkingDataBrighton> => {
      const config = queryKey[0];
      if (typeof config === "string") {
        throw new Error("Config is a string");
      }
      return config.fetcher();
    },
    refetchInterval: 10000,
  });

  const isAvailableParking = useMemo(() => {
    if (!data) {
      return false;
    }

    return DATES_TO_CHECK.some((dateString) => {
      const key = Object.keys(data).find((k) => k.startsWith(dateString));
      const dateData = key ? data[key] : undefined;
      if (!dateData) {
        throw new Error(
          "Unable to find the date.  Make sure the date string is formatted correctly and that the MONTH is correct."
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return parkingLotConfig.getSpacesAvailable(dateData as any);
    });
  }, [data, parkingLotConfig]);

  return (
    <div
      style={{
        width: "100vw",
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
          <h2 style={{ textAlign: "center", display: "inline-flex" }}>
            Checking Parking Status for {parkingLotConfig.name}...
          </h2>
          <p>Parking still not available 😔</p>
        </>
      )}
      <p>
        Last checked at <span>{new Date(dataUpdatedAt).toTimeString()}</span>
      </p>

      <AudioPlayer
        autoPlay={isAvailableParking}
        autoPlayAfterSrcChange
        src={isAvailableParking ? "/rolled.mp3" : undefined}
        onEnded={(e) => {
          console.log("e :>> ", e);
        }}
        style={{
          visibility: "hidden",
        }}
      />
    </div>
  );
};
