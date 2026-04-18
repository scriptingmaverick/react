
const Image = ({ url, name }) => (
  <div className="img-container width-100 flex justify-center">
    <img
      src={url}
      alt={name}
      className="width-80 height-100"
    />
  </div>
);

export default Image