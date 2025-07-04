import { createContext } from "react";

interface UserAgentContextType {
  userAgent: string | undefined;
  setUserAgent: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const UserAgentContext = createContext<UserAgentContextType>({
  userAgent: undefined,
  setUserAgent: () => {},
});

export default UserAgentContext;
