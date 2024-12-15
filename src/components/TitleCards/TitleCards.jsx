import { useEffect, useRef, useState } from "react";
import "./TitleCard.css";
import { Link } from "react-router-dom";
// import cards_data from "../../assets/cards/Cards_data";

// eslint-disable-next-line react/prop-types
const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGY5YTZmZjg0MmMxMjU5OGM2N2MwNzFmMWFiODZjYSIsIm5iZiI6MTczMDEwMTQ1NS41ODkyLCJzdWIiOiI2NDEwNjFmZmE2YzEwNDAwOWFmZWIwN2QiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zlJ-qpIB9oefX5dVJVog1GhR4Bgr1uAp3d3XrtvKZW8",
    },
  };

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    const refCurrent = cardsRef.current;
    refCurrent.addEventListener("wheel", handleWheel);
    // cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
