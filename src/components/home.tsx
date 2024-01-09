import { Stack } from "@mui/material";
import { useState } from "react";
import { CheckParkingStatus } from "./check-parking-status";

export const Home = () => {
  const [isEntered, setEntered] = useState(false);
  return (
    <Stack>
      {/* Force page interaction so that sound plays. */}
      {isEntered ? (
        <CheckParkingStatus parkingLot="alta" />
      ) : (
        <div
          style={{
            display: "flex",
            width: "100vw",
            justifyContent: "center",
          }}
        >
          <button onClick={() => setEntered(true)}>Get started!</button>
        </div>
      )}
    </Stack>
  );
};
