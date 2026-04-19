const toasts = {
  201: { message: "created succesfully", type: "success" },
  401: {
    message: "Title length must be minimum of 2 chars",
    type: "error",
  },
};

export const createToast = ({ data, code }, setToast) => {
  const toastData = toasts[code];

  if (data) toastData.message = `${data} ${toastData.message}`;

  setToast(toastData);
};
