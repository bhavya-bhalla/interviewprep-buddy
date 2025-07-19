import { Link } from 'react-router-dom';

function Card({ title, desc, link }) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{desc}</p>
      <Link to={link} className="text-blue-600 font-medium hover:underline">
        Open →
      </Link>
    </div>
  );
}

export default Card;
