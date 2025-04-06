import { Link } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

export default function MovieCards({ movie, onClick }: MoviesProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const { role, subscription } = useAuth();

  const isPremiumLocked = movie.premium && role !== "admin" && !subscription;

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick(movie);
    } else {
      scrollToTop();
    }
  };

  let linkDestination = "/";

  if (role === "anonymous") linkDestination = "/signup";
  else if (isPremiumLocked) linkDestination = "/payment";
  else linkDestination = `/movies/${movie.id}`;

  return (
    <div className="card-movie-img">
      <Link to={linkDestination} onClick={handleClick}>
        <img src={movie.poster} alt={movie.title} />
      </Link>
      <p className="movie-title">{movie.title}</p>
    </div>
  );
}
