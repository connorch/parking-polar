import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  FormControl,
  IconButton,
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
import { Github } from "lucide-react";

export const Home = () => {
  const [isEntered, setEntered] = useState(false);
  const [resort, setResort] = useState<"alta" | "brighton">("brighton");
  const [date, setDate] = useState<Dayjs | null>(dayjs(Date.now()));

  return (
    <Stack
      sx={{
        width: "100vw",
        height: "100vh",
        justify: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Force page interaction so that sound plays. */}
        {isEntered ? (
          <CheckParkingStatus parkingLot={resort} day={date!} />
        ) : (
          <Stack sx={{ alignItems: "center" }}>
            <Stack
              direction="row"
              gap={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Avatar src="/polar-bear.jpg" sx={{ width: 80, height: 80 }} />
              <Typography variant="h1" noWrap>
                Parking Polar
              </Typography>
            </Stack>
            <Typography color="text.secondary" sx={{ textAlign: "center" }}>
              Poll parking to check availability at Alta or Brighton.
              <br /> Be alerted when someone cancels!
            </Typography>
            <Card sx={{ mt: 4 }}>
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
          </Stack>
        )}
      </Container>
      <Box sx={{ py: 2 }}>
        <IconButton
          component="a"
          href="https://github.com/connorch/parking-polar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
        </IconButton>
      </Box>
    </Stack>
  );
};
