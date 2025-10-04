// utils.js
import { toast } from "react-toastify";

// success toast
export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
  });
};

// error toast
export const handleError = (msg) => {
  toast.error(msg, {
    position: "top-right",
  });
};
