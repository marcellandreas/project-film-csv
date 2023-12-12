import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modals from "../../../helpers/modals";
import ShowModal from "../ShowModals";
import SignUp from "../../molecules/Content/SignUp";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { AxiosInstance } from "../../apis";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const idUser = localStorage.getItem("id_user");
  const [isScrolled, setIsScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

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

  const { modalState, showModal, closeModal } = Modals();
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

  const handleActionType = () => {
    AxiosInstance.post(`type`, {
      id_user: Number(idUser),
      action_type: "button genres",
    })
      .then(console.log("berhasil"))
      .catch(console.log("gagal"));
  };

  const handleButtonClick = () => {
    if (!token) {
      alert("Anda Belum Login");
    } else {
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Berhasil Logout");
    localStorage.removeItem("token");
    navigate("/");
  };

  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(true);
  };
  const handleDropdownOut = () => {
    setDropdown(false);
  };

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
              {isMobileOpen ? <IoMdClose /> : <GiHamburgerMenu />}
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
                  {!token ? (
                    <NavLink
                      activeClassName="border border-secondary"
                      className={`hover:text-secondary `}
                      onClick={handleButtonClick}
                    >
                      Genres
                    </NavLink>
                  ) : (
                    <NavLink
                      activeClassName="border border-secondary"
                      className={`hover:text-secondary`}
                      to={`/genres`}
                      onClick={handleActionType}
                    >
                      Genres
                    </NavLink>
                  )}
                </ul>
                {!token ? (
                  <button
                    onClick={() => showModal("login")}
                    className="py-2 px-5 rounded-xl bg-secondary hover:bg-blue-600"
                  >
                    Login
                  </button>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="py-2 px-5 rounded-xl bg-secondary hover:bg-blue-600"
                  >
                    Logout
                  </button>
                )}
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
              {!token ? (
                <NavLink
                  activeClassName="border border-secondary"
                  className={`hover:text-secondary `}
                  onClick={handleButtonClick}
                >
                  Genres
                </NavLink>
              ) : (
                <NavLink
                  activeClassName="border border-secondary"
                  className={`hover:text-secondary`}
                  to={`/genres`}
                  onClick={handleActionType}
                >
                  Genres
                </NavLink>
              )}
            </ul>
            {!token ? (
              <button
                onClick={() => showModal("login")}
                className="py-2 px-5 rounded-xl bg-secondary hover:bg-blue-600"
              >
                Login
              </button>
            ) : (
              <button
                // onClick={handleDropdown}
                onMouseEnter={handleDropdown}
                className=" cursor-pointer h-10 w-10 rounded-full relative"
              >
                <img src={""} className=" h-10 w-10 rounded-full" alt="" />
                {dropdown ? (
                  <div
                    onMouseEnter={handleDropdown}
                    onMouseLeave={handleDropdownOut}
                    className=" -left-44 w-[220px] top-[8vh] flex flex-col gap-2 absolute text-lg bg-gray-100 rounded-md p-4"
                  >
                    <div className=" flex gap-2  items-center">
                      <img
                        src={""}
                        className=" h-11 w-11 rounded-full border border-black  "
                        alt=""
                      />
                      <p className=" text-xl font-bold text-black">
                        {username}
                      </p>
                    </div>
                    <hr className=" border-gray-300" />
                    <Link
                      to={`/account`}
                      className=" flex gap-2 justify-start text-slate-800 items-center"
                    >
                      {/* <PiShieldWarningLight className="  text-2xl" /> */}
                      <p className=" font-medium ">Profile Saya</p>
                    </Link>
                    <hr className=" border-gray-300 " />
                    <button
                      onClick={handleLogout}
                      className=" flex gap-2 justify-start text-slate-800 items-center"
                    >
                      {/* <IoMdLogOut className="  text-2xl" /> */}
                      <p className="  font-medium ">Logout</p>
                    </button>
                  </div>
                ) : null}
              </button>
            )}
          </header>
        </nav>
      )}
      <ShowModal
        isVisible={modalState.login}
        onClose={() => closeModal("login")}
      >
        <SignUp setLoggedIn={setLoggedIn} onClose={() => closeModal("login")} />
      </ShowModal>
    </>
  );
};

export default Navbar;
