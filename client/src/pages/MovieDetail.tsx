import { useLoaderData } from "react-router-dom";
import "../styles/MoviesDetail.css";
import FavoriteButton from "../components/FavoriteButton";
import MovieCards from "../components/MovieCards";

export default function MovieDetail() {
  const movieData = useLoaderData() as {
    movieId: MovieType;
    movies: MovieType[];
  };

  const movieId = movieData.movieId;
  const movies = movieData.movies;

  const sameGenre = movies
    .filter((movie) =>
      movie.genres.split(",").some((genre) => movieId.genres.includes(genre)),
    )
    .slice(0, 12);

  return (
    <section className="movie-details">
      <div
        className="details"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 11, 11, 0.2), rgba(11, 11, 11, 0.2)), url(${movieId.landscape_image})`,
        }}
      >
        <h2 className="movie-titleDetail">{movieId.title}</h2>
        <p>
          {movieId.genres} . {movieId.duration} . {movieId.release_year}
        </p>
        <div className="content-details">
          <span className="badge-4k" aria-label="4K" role="img" />
          <span className="dolby-vision" aria-label="Dolby Vision" role="img" />
          <span className="dolby-atmos" aria-label="Dolby Atmos" role="img" />
          <span className="cc" aria-label="Sous-titres codés" role="img" />
          <span className="ad" aria-label="Audiodescription" role="img" />
          <span
            className="sdh"
            aria-label="Sous-titrage pour les sourds et malentendants"
            role="img"
          />
        </div>
      </div>
      <iframe
        className="short-movie"
        width="100%"
        height="auto"
        src={movieId.trailer}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <h3 className="same-genre">Vous pourriez aimer aussi...</h3>
      <section className="movie-container">
        {sameGenre.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </section>
    </section>
  );
}
