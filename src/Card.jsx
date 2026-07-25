import { Link } from 'react-router-dom';

function Card({ id, name, role, gradient, accent }) {
  return (
    <Link to={`/user/${id}`} className="card-link">
      <div className="card">
        <div className="card-banner" style={{ background: gradient }}></div>
        <div className="card-body">
          <p className="card-name">{name}</p>
          <p className="card-role" style={{ color: accent }}>{role}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;