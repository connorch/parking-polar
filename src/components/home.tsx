import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CheckParkingStatus } from "./check-parking-status";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

export const Home = () => {
  const [isEntered, setEntered] = useState(false);
  const [resort, setResort] = useState<"alta" | "brighton">("brighton");
  const [date, setDate] = useState<Dayjs | null>(dayjs(Date.now()));

  return (
    <Stack sx={{ width: "100vw", justify: "center" }}>
      <Container maxWidth="sm">
        {/* Force page interaction so that sound plays. */}
        {isEntered ? (
          <CheckParkingStatus parkingLot={resort} day={date!} />
        ) : (
          <>
            <Typography variant="h1" gutterBottom>
              Parking Poller
            </Typography>
            <Card>
              <CardContent>
                <Stack direction="row" gap={2}>
                  <FormControl fullWidth>
                    <InputLabel>Ski Resort</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={resort}
                      label="Ski Resort"
                      onChange={(e) =>
                        setResort(e.target.value as "alta" | "brighton")
                      }
                    >
                      <MenuItem value={"alta"}>Alta</MenuItem>
                      <MenuItem value={"brighton"}>Brighton</MenuItem>
                    </Select>
                  </FormControl>
                  <DatePicker
                    label="Controlled picker"
                    value={date}
                    onChange={(newDate) => setDate(newDate)}
                    sx={{ w: "100%" }}
                  />
                </Stack>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setEntered(true)}
                  disabled={!resort || !date}
                >
                  Get Started!
                </Button>
              </CardActions>
            </Card>
          </>
        )}
      </Container>
    </Stack>
  );
};
