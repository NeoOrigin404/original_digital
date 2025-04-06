import { useLoaderData } from "react-router-dom";
import "../styles/MoviesDetail.css";
import MovieCards from "../components/MovieCards";
import { useState } from "react";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="movie-details">
      <div
        className="movie-header"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 11, 11, 0.2), rgba(11, 11, 11, 0.2)), url(${movieId.landscape_image})`,
        }}
      >
        <h2>{movieId.title}</h2>
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
      <div className="movie-footer">
        <div className="button-content">
          <button type="button" onClick={handleOpenModal}>
            <span aria-label="Logo player" role="img" />
            LECTURE
          </button>
        </div>
        <div className="production-content">
          <p>{movieId.synopsis}</p>
          <p>Avec : {movieId.casting}</p>
          <p>Production : {movieId.production}</p>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button type="button" onClick={handleCloseModal}>
              X
            </button>
            <div className="modal-content">
              <iframe
                width="100%"
                height="350px"
                src={movieId.trailer}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <div className="trailer-content">
        <h2>
          Bande-annonces <span />
        </h2>
        <iframe
          width="100%"
          height="350px"
          src={movieId.trailer}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        <h3>
          Vous pourriez aimer aussi... <span />
        </h3>
      </div>
      <section className="movie-container">
        {sameGenre.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </section>
    </section>
  );
}
