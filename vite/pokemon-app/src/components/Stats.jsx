const Stats = ({ stats }) => (
  <div className="stats width-100 flex height-70 flex-col">
    {stats.map(({ name, value }, id) => (
      <div key={id} className="stat flex justify-between">
        <span className="name">{name}</span>
        <span className="value">{value}</span>
      </div>
    ))}
  </div>
);

export default Stats;
