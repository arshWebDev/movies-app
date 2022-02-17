import "./styles/Genre.scss";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { fetchGenreData, fetchMoreData } from "../utils";

import Genres from "../components/Genres";
import PosterCard from "../components/cards/PosterCard";

import InfiniteScroll from "react-infinite-scroll-component";

const Genre = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [resultsCount, setResultsCount] = useState("");
  const [page, setPage] = useState(1);
  const params = useParams();

  const loadingArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  useEffect(() => {
    fetchGenreData(params.query, params.genreId).then((fetchedData) => {
      setData(fetchedData.results);
      setResultsCount(fetchedData.total_results);
      setLoading(false);
    });

    setLoading(true);
  }, [params]);

  const InfiniteScrollFunction = () => {
    fetchMoreData(params.query, params.genreId, page).then((fetchedData) => {
      setData([...data, ...fetchedData.results]);
    });
    setPage(page + 1);
  };

  return (
    <>
      <Genres query={params.query === "movie" ? "movie" : "tv"} />

      <div className="genre">
        <h2>{params.query === "movie" ? " movies" : " tv shows"}</h2>
        <InfiniteScroll
          dataLength={data.length}
          next={InfiniteScrollFunction}
          hasMore={data.length !== resultsCount}
          loader={
            <div className="loading--spinner">
              <div></div>
            </div>
          }
        >
          <div className="genre--cards">
            {!loading
              ? data.map((item) => (
                  <PosterCard
                    key={item.title ? item.title : item.name}
                    data={item}
                  />
                ))
              : loadingArray.map((item) => (
                  <div key={item} className="loading--card--poster"></div>
                ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Genre;