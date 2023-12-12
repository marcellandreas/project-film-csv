import Slider from "react-slick";
import { CustomNextArrow, CustomPrevArrow } from "../../molecules/Arrows";

const SliderFilm = ({ children }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  return <Slider {...settings}>{children}</Slider>;
};

export default SliderFilm;
