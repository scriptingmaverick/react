const Toast = ({ data: { message, type } }) => {
  return (
    <div
      id="toast"
      style={{ backgroundColor: type === "success" ? "green" : "red" }}
    >
      <span id="toast-text">{message}</span>
      <span id="time-bar"></span>
    </div>
  );
};

export default Toast;
