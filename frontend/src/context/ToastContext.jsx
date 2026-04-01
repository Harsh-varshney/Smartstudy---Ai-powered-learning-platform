import { createContext, useState, useContext } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast UI */}
      {toast.show && (
        <div
          className={`toast show position-fixed end-0 m-3 text-white bg-${toast.type}`} 
          style={{ top: "80px", zIndex: 9999 }}
          role="alert"
        >
          <div className="toast-body">
            {toast.message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);