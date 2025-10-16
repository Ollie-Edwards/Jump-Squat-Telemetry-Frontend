import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { pingSensor } from "../api/manageSensor";

import { useEffect, useState, useRef } from "react";

export const useSetInterval = (cb: () => void, time: number) => {
  const cbRef = useRef<() => void | null>(null);

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  useEffect(() => {
    console.log("check");
    const interval = setInterval(() => cbRef.current?.(), time);
    return () => clearInterval(interval);
  }, [time]);
};

function CheckConnection() {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  const checkConnection = async () => {
    try {
      setLoading(true);
      const response = await pingSensor();
      setConnected(!!response); // Set connected status, !! to ensure boolean
    } finally {
      setLoading(false);
    }
  };

  useSetInterval(() => checkConnection(), 3000);

  if (!connected && loading) {
    return (
      <Alert className="mx-auto my-5 w-100">
        <PopcornIcon />
        <AlertTitle className="text-yellow-500 ">Loading...</AlertTitle>
        <AlertDescription>Loading...</AlertDescription>
      </Alert>
    );
  }

  if ((connected && !loading) || (connected && loading)) {
    return (
      <Alert className="mx-auto my-5 w-100">
        <CheckCircle2Icon />
        <AlertTitle className="text-green-500 ">Connected!</AlertTitle>
        <AlertDescription>Successfully connected to ESP32</AlertDescription>
      </Alert>
    );
  }

  if (!connected && !loading) {
    return (
      <Alert className="mx-auto my-5 w-100">
        <AlertCircleIcon />
        <AlertTitle className="text-red-500 ">Error - Disconnected!</AlertTitle>
        <AlertDescription>Connection to ESP32 failed</AlertDescription>
      </Alert>
    );
  }

  return (<h1>Something went wrong</h1>)
}

export default CheckConnection;
