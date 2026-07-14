function Card({ name, role, gradient, accent }) {
  return (
    <div className="card">
      <div className="card-banner" style={{ background: gradient }}></div>
      <div className="card-body">
        <p className="card-name">{name}</p>
        <p className="card-role" style={{ color: accent }}>{role}</p>
      </div>
    </div>
  );
}

export default Card;