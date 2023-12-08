import { useParams } from "react-router-dom";
import { CardFilmDetails } from "../molecules/Cards";
import DataFilm from "../../assets/data/dumyFilm.json";
import { useEffect, useState } from "react";
import bg from "../../assets/images/bg.jpg";
import Navbar from "../organisms/Navbar";

const DetailPopuler = () => {
  const { filmId } = useParams();
  const [film, setFilm] = useState(null);
  console.log(filmId);

  useEffect(() => {
    const selectedFilm = DataFilm.films.find((f) => f.id === Number(filmId));
    console.log(selectedFilm);
    setFilm(selectedFilm);
  }, [filmId]);
  return (
    <section>
      <Navbar />
      <div className="w-full h-[70vh] relative text-white bg-red-900 min-h-screen">
        <img className="w-full h-[100vh] bg-cover" src={bg} alt="" />
        <div className="opacity-layer"></div>
        <CardFilmDetails data={film} />
      </div>
    </section>
  );
};

export default DetailPopuler;
