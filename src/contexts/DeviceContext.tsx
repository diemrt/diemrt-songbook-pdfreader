import { createContext } from "react";

const DeviceContext = createContext<{
  deviceId: string | undefined;
  setDeviceId: React.Dispatch<React.SetStateAction<string | undefined>>;
}>({
    deviceId: undefined,
    setDeviceId: () => {},
});
export default DeviceContext;
