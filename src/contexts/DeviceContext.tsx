import { createContext } from "react";

const DeviceContext = createContext<{
    deviceId?: string;
}>({
    deviceId: undefined,
});
export default DeviceContext;