const Types = ({ types }) => (
  <div className="types width-50 flex justify-end">
    {types.map(({ type:{name} }, id) => (
      <span key={id} className={name}>
        {name}
      </span>
    ))}
  </div>
);

export default Types;
