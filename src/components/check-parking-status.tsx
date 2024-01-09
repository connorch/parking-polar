import { useQuery } from "@tanstack/react-query";
import { fetchBrightonParking } from "../api/fetch-brighton-parking";
import { useMemo } from "react";
import AudioPlayer from "react-h5-audio-player";

const DATES_TO_CHECK = ["2024-03-23", "2024-01-14"] as const;

export const CheckParkingStatus = () => {
  const { data, dataUpdatedAt } = useQuery({
    queryKey: ["brighton-parking-status"],
    queryFn: fetchBrightonParking,
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

      return dateData.general.available_spaces > 0;
    });
  }, [data]);

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
            PARKING AVAILABLE!!!
          </h2>
          <a
            href="https://www.parkbrightonresort.com/reservenski"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go Reserve Fast!
          </a>
        </>
      ) : (
        <>
          <h2 style={{ textAlign: "center", display: "inline-flex" }}>
            Checking Parking Status...
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
