import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CustomNextArrow, CustomPrevArrow } from "../../molecules/Arrows";
import { useEffect, useState } from "react";
import { AxiosTmbd } from "../../apis";

const BannerSec = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    AxiosTmbd.get(`/trending/movie/day`, {
      params: { api_key: "601ba3c5082ecde5261c7f8b6c89b073" },
    }).then((res) => {
      console.log("Trending", res.data);
      setData(res.data.results);
    });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const banner = [];
  return (
    <div className="w-full m-auto relative">
      <Slider {...settings}>
        {data.map((datum, index) => (
          <div key={index} className="relative">
            <LazyLoadImage
              src={`https://image.tmdb.org/t/p/w500/${datum.backdrop_path}`}
              alt={`photo `}
              offset={100}
              className="w-full bg-cover h-[50vh] object-fill"
            />
            <div className="card-film text-white absolute top-20 left-28 p-4 min-h-[200px] w-[400px]">
              <h2 className=" text-2xl font-bold">{datum.title}</h2>
              <p>{datum.release_date}</p>
              <p className=" line-clamp-4">{datum.overview}</p>
            </div>
          </div>
        ))}
      </Slider>
      <div className="opacity-layer"></div>
    </div>
  );
};

export default BannerSec;
