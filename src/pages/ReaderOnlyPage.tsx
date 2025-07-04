import MusicPDFReader from "../components/MusicPDFReader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { connect, keepAlive } from "../api";
import { useContext, useEffect } from "react";
import DeviceContext from "../contexts/DeviceContext";

const ReaderOnlyPage = () => {
  const getUniqueBrowserId = () => {
    return `${navigator.userAgent}-${navigator.language}-${Math.random().toString(36).substring(2, 15)}`;
  };

  const { deviceId, setDeviceId } = useContext(DeviceContext);
  const browserInfo = getUniqueBrowserId();
  const { data } = useQuery({
    queryKey: ["connection"],
    queryFn: async () => {
      return await connect({
        deviceId: browserInfo,
        ipAddress: "127.0.0.1",
        userAgent: "device",
      });
    },
    enabled: deviceId === undefined,
  });

  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      if (id) {
        await keepAlive({
          deviceId: id,
          userAgent: navigator.userAgent,
          ipAddress: "127.0.0.1"
        });
      }
    },
    onSuccess: () => {
      console.log("Keep alive successful");
    },
  });

  useEffect(() => {
    if (data?.deviceId) {
      setDeviceId(data.deviceId);
      mutate(data.deviceId);
      const interval = setInterval(() => {
        mutate(data.deviceId);
      }, 15000); // 30 secondi
      return () => clearInterval(interval);
    }
  }, [data?.deviceId, mutate, setDeviceId]);

  return <MusicPDFReader />;
};

export default ReaderOnlyPage;
