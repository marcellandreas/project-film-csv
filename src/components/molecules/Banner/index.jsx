import Slider from "react-slick";
import banner from "../../../assets/images/banner.jpg";
import SliderFilm from "../../templates/Slider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CustomNextArrow, CustomPrevArrow } from "../Arrows";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="w-full m-auto relative">
      <Slider {...settings}>
        {[banner, banner].map((data, index) => (
          <div key={index}>
            <LazyLoadImage
              src={data}
              alt=""
              className="w-full bg-cover h-[70vh] object-fill"
            />
          </div>
        ))}
      </Slider>
      <div className="opacity-layer"></div>
    </div>
  );
};

export default Banner;
