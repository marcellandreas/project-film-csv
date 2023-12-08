import { LazyLoadImage } from "react-lazy-load-image-component";
import { Rating } from "react-simple-star-rating";

export const CardFilmDetails = ({ data }) => {
  console.log(data);
  return (
    <div className="card-details bg-amber-500 grid grid-flow-dense grid-cols-6 gap-4 rounded-3xl w-[90%]  min-h-fit p-5">
      <div className="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-1 relative w-full">
        <div className="absolute bottom-5 right-2  flex items-center justify-center h-10 w-10 rounded-full bg-amber-500">
          {data?.rating}
        </div>
        <LazyLoadImage
          className="h-[40vh] sm:w[220px] w-[540px] rounded-2xl bg-cover   "
          src={data?.poster}
          alt=""
          delayTime={`2000`}
        />
      </div>
      <div className="col-span-6   sm:col-span-6 md:col-span-3 lg:col-span-5 flex gap-3 flex-col">
        <h2 className=" text-3xl underline">{data?.judul_film}</h2>
        <p className=" text-lg">Rilis: {data?.tahun_rilis}</p>
        <div className=" flex-wrap flex gap-2  ">
          {data?.genre?.map((genre, i) => (
            <span
              key={i}
              className=" mr-3 px-3 cursor-pointer py-1 border-2 rounded-full "
            >
              {genre}
            </span>
          ))}
        </div>
        <p className=" text-lg line-clamp-5">{data?.sinopsis}</p>
      </div>
    </div>
  );
};
