import { createContext, useContext, useState, useCallback, useEffect } from "react";
import Notification from "@/components/Notification";

const NotificationContext = createContext({
  showNotification: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = "error") => {
    setNotification({ message, type });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  useEffect(() => {
    const handler = (e) => showNotification(e.detail.message, e.detail.type);
    window.addEventListener("gibo-notification", handler);
    return () => window.removeEventListener("gibo-notification", handler);
  }, [showNotification]);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
    </NotificationContext.Provider>
  );
}
