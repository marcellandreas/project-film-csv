import Navbar from "../organisms/Navbar";
import dataFilmPopuler from "../../assets/data/dumyFilm.json";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";

const MorePopuler = () => {
  const navigate = useNavigate();
  const backToprev = () => {
    navigate(-1);
  };
  return (
    <section className=" min-h-screen bg-red-900">
      <Navbar />
      <div className=" pt-[15vh] text-white md:mx-40 sm:mx-4 ">
        <div className=" text-center mb-4 underline">
          <button onClick={backToprev} className=" absolute left-40 top-[18vh]">
            back
          </button>
          <h1 className="text-3xl ">Populer List</h1>
        </div>
        {/* list movie */}
        <div>
          <div className="w-full grid grid-flow-dense grid-cols-12 gap-4">
            {dataFilmPopuler?.films.map((data, i) => (
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
        </div>
      </div>
    </section>
  );
};

export default MorePopuler;
