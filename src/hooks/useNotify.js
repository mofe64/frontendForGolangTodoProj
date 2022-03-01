import { toast } from "react-toastify";

const notify = (
  message = "",
  isError = false,
  successCloseFunc = (f) => f,
  errorCloseFunc = (f) => f
) => {
  if (!isError) {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => {
        successCloseFunc();
      },
    });
  } else {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => {
        errorCloseFunc();
      },
    });
  }
};

export default notify;
