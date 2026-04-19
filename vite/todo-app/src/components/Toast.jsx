export const handlerToast = (toast) => {
  const element = document.getElementById("toast");
  if (!element) return;

  element.style.display = "block";
  let time = 0;

  const id = setInterval(() => {
    time += 300;

    if (time === 3000) {
      element.style.display = "none";
      clearInterval(id);
    }

    console.log({time,toast});
  }, 300);
};

const Toast = ({ data: { message, type } }) => {
  return (
    <div
      id="toast"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        color: "white",
        padding: "15px 20px",
        borderRadius: "5px",
        fontSize: "1.2em",
        backgroundColor: type === "success" ? "green" : "red",
      }}
    >
      <span id="toast-text" style={{ color: "white" }}>
        {message}
      </span>
      <span
        id="time-bar"
        style={{
          width: "100%",
          height: "10px",
          backgroundColor: "yellow",
          position: "absolute",
          bottom: "0px",
          left: "0px",
        }}
      ></span>
    </div>
  );
};

export default Toast;
