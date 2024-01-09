import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CheckParkingStatus } from "./components/check-parking-status";
import { useState } from "react";

// Create a client
const queryClient = new QueryClient();

function App() {
  const [isEntered, setEntered] = useState(false);
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      {/* Force page interaction so that sound plays. */}
      {isEntered ? (
        <CheckParkingStatus />
      ) : (
        <div
          style={{ display: "flex", width: "100vw", justifyContent: "center" }}
        >
          <button onClick={() => setEntered(true)}>Get started!</button>
        </div>
      )}
    </QueryClientProvider>
  );
}

export default App;
