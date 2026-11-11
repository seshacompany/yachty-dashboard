import type { notificationType } from "@/types/typesLayouts";
import { useEffect, useRef } from "react";
import type { Socket } from "socket.io-client";

type Props = {
  enabled: boolean;
  setNotifications: React.Dispatch<React.SetStateAction<notificationType[]>>;
};

export const useNotificationsSocket = (_props?: Props) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Disabled in mock mode
    return () => {
      socketRef.current = null;
    };
  }, []);

  return socketRef;
};
