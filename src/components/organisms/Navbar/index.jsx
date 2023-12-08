import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggle = () => setIsMobileOpen(!isMobileOpen);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {windowWidth < 768 ? (
        <nav
          className={`m-0 h-[10vh] fixed w-full z-50 border-b-2 flex justify-between items-center p-4 text-white ${
            isScrolled
              ? "bg-transparant"
              : "bg-opacity-90 backdrop-filter backdrop-blur-md"
          }`}
        >
          {/* logo */}
          <Link to={`/`}>
            <h1 className=" text-2xl font-bold cursor-pointer flex">
              <p className=" border-b-2 border-secondary mb-2">Review</p>
              <span className=" text-secondary border-b-2 border-white    ">
                Film
              </span>
            </h1>
          </Link>
          <div className=" flex gap-5 h-full   items-center justify-center">
            <button onClick={toggle} className=" text-3xl">
              {isMobileOpen ? <p>X</p> : <div>-</div>}
            </button>
            {isMobileOpen ? (
              <header className="flex flex-col gap-5 z-[999px] left-0 w-full px-2 py-10 absolute bg-gray-900 top-[10vh]  ">
                <ul className="flex flex-col gap-5 items-center capitalize text-lg">
                  <NavLink
                    activeClassName="border border-secondary"
                    className="hover:text-secondary"
                    to={`/`}
                  >
                    Beranda
                  </NavLink>
                  <NavLink
                    activeClassName="border border-secondary"
                    className="hover:text-secondary"
                    to={`/genres`}
                  >
                    Genres
                  </NavLink>
                </ul>
              </header>
            ) : null}
          </div>
        </nav>
      ) : (
        <nav
          className={`m-0 h-[10vh] fixed w-full z-50 border-b-2 flex justify-between items-center p-4 text-white ${
            isScrolled
              ? "bg-opacity-90 backdrop-filter backdrop-blur-md"
              : "bg-slate-600"
          }`}
        >
          {/* logo */}
          <Link to={`/`}>
            <h1 className=" text-2xl font-bold cursor-pointer flex">
              <p className=" border-b-2 border-secondary mb-2">Review</p>
              <span className=" text-secondary border-b-2 border-white    ">
                Film
              </span>
            </h1>
          </Link>
          <header className="flex gap-5">
            <ul className="flex gap-5 items-center capitalize text-lg">
              <NavLink
                activeClassName="border border-secondary"
                className="hover:text-secondary"
                to={`/`}
              >
                Beranda
              </NavLink>
              <NavLink
                activeClassName="active"
                className="hover:text-secondary"
                to={`/genres`}
              >
                Genres
              </NavLink>
            </ul>
          </header>
        </nav>
      )}
    </>
  );
};

export default Navbar;
