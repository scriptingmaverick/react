const toasts = {
  201: { message: "created succesfully", type: "success" },
  202: { message: "edited succesfully", type: "success" },
  "202-status": { message: "task status changed", type: "success" },
  204: { message: "removed successfully", type: "success" },
  401: {
    message: "Title length must be minimum of 2 chars",
    type: "error",
  },
};

let i = 0;

export const createToast = ({ data, code }, setToast) => {
  const toastData = structuredClone(toasts[code]);

  if (data) toastData.message = `${data} ${toastData.message}`;

  setToast({ ...toastData, id: Date.now() });
};

let currentInterval = null;

export const toastHandler = (toast) => {
  const element = document.getElementById("toast");
  if (!element) return;

  if (currentInterval) {
    clearInterval(currentInterval);
  }

  element.style.display = "block";
  let time = 0;

  currentInterval = setInterval(() => {
    time += 200;

    if (time === 2000) {
      element.style.display = "none";
      clearInterval(currentInterval);
      currentInterval = null;
    }
  }, 200);
};
