import { ReactNode, createContext, useState } from "react";

export type NotificationStore = {
  isEnabled: boolean;
  message: string;
  type: "success" | "info" | "warning" | "error";
  resetNotification: VoidFunction;
  setNotification: (
    isEnabled: boolean,
    message: string,
    type: NotificationStore["type"]
  ) => void;
};

const NotifcationContext = createContext<NotificationStore>(
  {} as NotificationStore
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<NotificationStore["type"]>("success");

  const resetNotification = () => {
    setIsEnabled(false);
    setMessage("");
    setType("success");
  };

  const setNotification = (
    isEnabled: boolean,
    message: string,
    type: NotificationStore["type"]
  ) => {
    setIsEnabled(isEnabled), setMessage(message);
    setType(type);
  };

  return (
    <NotifcationContext.Provider
      value={{ isEnabled, message, type, resetNotification, setNotification }}
    >
      {children}
    </NotifcationContext.Provider>
  );
};

export default NotifcationContext;
