import { useEffect, useState } from "react";
import { useFetch } from "../hooks";

import { useNavigate, useParams } from "react-router-dom";

import { StarSolidIcon, ArrowLeftIcon } from "../components/icons";
import { CreditsList } from "../components/details";
import { convertMinsToHrsMins, modifyDate } from "../utils/time";

const Details = ({ type }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const data = useFetch(`${type}/${id}?language=en-US&`);
  const credits = useFetch(`${type}/${id}/credits?language=en-US&`);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && credits) {
      setLoading(false);
      console.log(data);
    }
  }, [data, credits]);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <main className="pt-6 pb-16 lg:pt-0">
          <div className="relative hidden lg:block h-[300px] overflow-hidden rounded-bl-[50px]">
            <div className="absolute z-[1] w-full h-full">
              <img
                loading="lazy"
                src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
                alt={data.name}
                className="w-full h-[600px] mt-[-150px]"
              />
            </div>
            <div className="absolute z-[2] w-full h-full bg-black bg-opacity-30"></div>
          </div>
          <div className="flex flex-col lg:flex-row gap-10 md:gap-20 lg:gap-6 items-center lg:items-start lg:px-36 mt-10 ">
            <div className="relative z-20 w-[60%] lg:min-w-[200px] max-w-[340px] lg:max-w-[200px] rounded-2xl">
              <div className="absolute z-[-1] rounded-2xl bg-gray-300 dark:bg-neutral-700 w-[95%] h-[103%] top-0 left-1/2 -translate-x-1/2"></div>
              <div className="absolute z-[-2] rounded-2xl bg-gray-200 dark:bg-neutral-800 w-[90%] h-[106%] top-0 left-1/2 -translate-x-1/2"></div>
              <img
                loading="lazy"
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt="backdrop"
                className="w-full rounded-2xl"
              />
            </div>

            <div className="w-full px-10 md:px-28 lg:px-0 lg:mt-2">
              <h1 className="text-xl md:text-3xl font-medium">
                {data.title ?? data.name}
              </h1>
              <h3 className="text-neutral-700 dark:text-neutral-400 mt-1">
                {data.tagline}
              </h3>
              <div className="flex gap-1 items-center mt-1.5 md:mt-3">
                <StarSolidIcon className="w-3 h-3 md:w-5 md:h-5 rating-icon" />
                <span className="text-sm md:text-base pt-[1px]">
                  {data.vote_average.toFixed(1)}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-2 md:mt-4">
                {data.genres.map((genre) => (
                  <div className="text-sm py-1 px-3 bg-gray-200 dark:bg-neutral-800 rounded-3xl">
                    {genre.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-6 w-full mt-5 md:mt-8 lg:mt-16 lg:px-36">
            <div className="flex flex-col gap-4 lg:min-w-[200px] px:10 md:px-28 lg:px-2">
              <div className="flex flex-row lg:flex-col gap-2 items-center lg:items-start">
              <h4 className="font-medium">Runtime:</h4>
              <p className="text-neutral-500 mt-1">{convertMinsToHrsMins(data.runtime)}</p>
              </div>
              <div className="flex flex-row lg:flex-col gap-2 items-center lg:items-start">
              <h4 className="font-medium">Release Date:</h4>
              <p className="text-neutral-500 mt-1">{modifyDate(data.release_date)}</p>
              </div>

            </div>
            <div className="overflow-hidden">
              <div className="px-10 md:px-28 lg:px-0">
                <h4 className="font-medium">Synopsis</h4>
                <p className="text-neutral-500 mt-2 md:mt-5">{data.overview}</p>
              </div>

              <div className="flex flex-col gap-3 md:gap-5 mt-4 md:mt-8">
                <CreditsList data={credits.cast} heading="cast" />
                <CreditsList data={credits.crew} heading="crew" />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Details;
