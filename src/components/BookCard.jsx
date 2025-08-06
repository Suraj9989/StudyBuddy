import { Link } from "react-router-dom";
import "./BookCard.css";
import { useParams } from "react-router-dom";
function BookCard({ title, author, year, image, id }) {
  return (
    <Link
      to={`/parampage/${id}`}
      state={{ title, author, image, year }} // jitna chahiye utna pass karo
      className="book-card-link"
    >
      <div className="book-card">
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{author}</p>
      </div>
    </Link>
  );
}

export default BookCard;
