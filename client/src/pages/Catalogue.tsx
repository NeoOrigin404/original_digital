import { useLoaderData, useNavigate } from "react-router-dom";
import MovieCards from "../components/MovieCards";
import { useState } from "react";
import "../styles/catalogue.css";
import { useAuth } from "../services/AuthContext";

export default function Catalogue() {
  const { movies } = useLoaderData() as {
    movies: MovieType[];
  };

  const navigate = useNavigate();
  const handlePaymentPage = () => {
    navigate("/payment");
  };

  const { subscription } = useAuth();

  const [selectedOffer, setSelectedOffer] = useState("free");

  const freeMovies = movies.filter((movie) => !movie.premium);
  const premiumMovies = movies.filter((movie) => movie.premium);
  const sfMovies = movies.filter((movie) =>
    movie.genres.includes("Science-fiction"),
  );

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const targetElement = document.querySelector("#acces");
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <div className="first-container">
        <img
          src="/Background_connection.jpg"
          className="img-container"
          alt="Combat entre Hulk rouge et Captain America"
        />
        {!subscription && (
          <button
            type="button"
            className="premium-offer"
            onClick={handleScroll}
          >
            Découvrir nos offres
          </button>
        )}
      </div>
      <div className="show-movies">
        <h2>Films gratuits</h2>
        <section className="movie-container">
          {freeMovies.map((movie) => (
            <MovieCards key={movie.id} movie={movie} />
          ))}
        </section>
        <h2>Tendances Actuelles</h2>
        <section className="movie-container">
          {sfMovies.map((movie) => (
            <MovieCards key={movie.id} movie={movie} />
          ))}
        </section>
        <h2>Films Premium</h2>
        <section className="movie-container">
          {premiumMovies.map((movie) => (
            <MovieCards key={movie.id} movie={movie} />
          ))}
        </section>
        <h2>Ma Liste</h2>
        <section className="movie-container">
          {movies.map((movie) => (
            <MovieCards key={movie.id} movie={movie} />
          ))}
        </section>
      </div>
      {!subscription && (
        <section id="acces" className="middle-element">
          <h2>Nos différentes souscriptions</h2>
          <div className="offer">
            <button
              type="button"
              className={`button ${selectedOffer === "free" ? "active" : "inactive"}`}
              onClick={() => setSelectedOffer("free")}
            >
              Gratuit
            </button>
            <button
              type="button"
              className={`button ${selectedOffer === "premium" ? "active" : "inactive"}`}
              onClick={() => setSelectedOffer("premium")}
            >
              Premium
            </button>
          </div>
          <div className="content">
            {selectedOffer === "free" ? (
              <div className="free">
                <p>Visionnez 4 films gratuits</p>
                <p className="disabled">Accédez à notre catalogue complet</p>
                <p className="disabled">Regardez en haute qualité</p>
                <p className="disabled">Gérez vos listes de films à voir</p>
              </div>
            ) : (
              <div className="premium">
                <p>Films illimités en haute qualité</p>
                <p>Accédez à notre catalogue complet</p>
                <p>Regardez en haute qualité</p>
                <p>Gérez vos listes de films à voir</p>
              </div>
            )}
            <button
              type="button"
              className="button-middle"
              onClick={handlePaymentPage}
            >
              Devenir Premium
            </button>
          </div>
        </section>
      )}
    </>
  );
}
