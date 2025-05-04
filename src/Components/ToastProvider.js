import React, { createContext, useCallback, useContext } from "react";
import PopUpNotification from "./PopUpNotification";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts,setToasts] = React.useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev,{ id, message, type}]);

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    },duration);
  },[]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <PopUpNotification toasts = {toasts} />
    </ToastContext.Provider>
  )
}