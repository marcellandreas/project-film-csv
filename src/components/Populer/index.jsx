import { Link } from "react-router-dom";
import dataFilmPopuler from "../../assets/data/dumyFilm.json";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Populer = () => {
  return (
    <section className=" pt-4">
      <div className="flex justify-between items-center h-[5vh] px-2 mb-4">
        <h1 className="text-3xl underline ">Populer</h1>
        <Link to={`/more-populer`}>view More</Link>
      </div>
      <div className="w-full grid grid-flow-dense grid-cols-12 gap-4">
        {dataFilmPopuler?.films.slice(0, 6).map((data, i) => (
          <Link
            key={i}
            to={`/more-populer/detail/${data.id}`}
            className="p-1 min-h-[240px]  border col-span-6 md:col-span-2 relative border-white  transition-shadow hover:scale-90 rounded-xl hover:rounded-xl hover:opacity-50 "
          >
            <LazyLoadImage
              src={data.poster}
              alt="poster"
              className=" rounded-md hover:rounded-md w-full"
              delayTime={3000}
            />
            <div className=" text-center flex justify-center items-center absolute bottom-0 w-[95%]  min-h-[5vh] font-semibold text-slate-900  card-film">
              <span className=" text-white text-md text-center line-clamp-1 font-bold">
                {data.judul_film}
              </span>
            </div>
          </Link>
        ))}
      </div>
      {/* cards */}
    </section>
  );
};

export default Populer;
