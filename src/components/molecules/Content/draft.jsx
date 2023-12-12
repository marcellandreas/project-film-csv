import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import React, { useState } from "react";
const DraftContent = ({ onClose, setLoggedIn }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab) => {
    setIsLoading(true);

    setTimeout(() => {
      setActiveTab(tab);
      setIsLoading(false);
    }, 3000);
  };
  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("email", emailReg);
    localStorage.setItem("password", passwordReg);
    onClose();
  };

  const handleLogin = () => {
    const emailRegValidation = localStorage.getItem("email");
    const passwordRegValidation = localStorage.getItem("password");

    if (emailRegValidation === email && passwordRegValidation === password) {
      alert("anda berhasil login");
      setLoggedIn(true);
      onClose();
    } else {
      alert("Login Gagal. Periksa kembali username dan password.");
    }
  };

  console.log(email, password);

  return (
    <section className="w-[400px] bg-primary z-50 rounded-lg p-3 relative text-white">
      <button
        onClick={onClose}
        className=" absolute top-0 right-0 rounded-closed  bg-black"
      >
        X
      </button>
      {isLoading ? (
        <p className=" min-h-[40vh] flex justify-center items-center">
          Sedang memuat Tampilan...
        </p>
      ) : (
        <div>
          <div className=" mb-3">
            <h1 className=" text-2xl font-bold text-center ">
              {activeTab === "signup" ? "Sign Up" : "Login"}
            </h1>
            <hr className=" border-1 border-secondary" />
          </div>
          <div className=" flex flex-col gap-8">
            {activeTab === "signup" && (
              <div className="flex flex-col gap-2">
                <div className=" flex flex-col gap-1 relative">
                  <label>
                    Email{" "}
                    {email === "" ? (
                      <span className="text-red-700">*</span>
                    ) : null}
                  </label>
                  <input
                    type="email"
                    placeholder="Masukan Email"
                    name="email"
                    className={`p-2 text-black outline-none rounded-lg`}
                    onChange={(e) => setEmailReg(e.target.value)}
                  />
                  <MdEmail className=" absolute bottom-2 right-2 text-2xl text-black" />
                </div>
                <div className=" flex flex-col gap-1 relative">
                  <label>
                    Password{" "}
                    {password === "" ? (
                      <span className="text-red-700">*</span>
                    ) : null}
                  </label>
                  <input
                    type={`${isShowPassword ? "text" : "password"}`}
                    placeholder="Masukan Password"
                    name="password"
                    className={`p-2 text-black outline-none rounded-lg`}
                    onChange={(e) => setPasswordReg(e.target.value)}
                  />
                  <span
                    className=" absolute bottom-2 right-2 text-2xl text-black cursor-pointer"
                    onClick={(e) => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                </div>
              </div>
            )}
            {activeTab === "login" && (
              <div className="flex flex-col relative gap-2">
                <div className="flex flex-col gap-1 relative">
                  <label>
                    Email{" "}
                    {email === "" && <span className="text-red-700">*</span>}
                  </label>
                  <input
                    type="email"
                    placeholder="Masukan Email"
                    name="email"
                    className={`p-2 text-black outline-none rounded-lg`}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MdEmail className="absolute bottom-2 right-2 text-2xl text-black" />
                </div>

                <div className="flex flex-col gap-1 relative">
                  <label>
                    Password{" "}
                    {password === "" && <span className="text-red-700">*</span>}
                  </label>
                  <input
                    type={`${isShowPassword ? "text" : "password"}`}
                    placeholder="Masukan Password"
                    name="password"
                    className={`p-2 text-black outline-none rounded-lg`}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="absolute bottom-2 right-2 text-2xl text-black cursor-pointer"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                </div>
              </div>
            )}
            <div className="flex gap-2 mt-2 font-bold text-lg">
              {/* <button
                onClick={() => {
                }}
                className="flex-1 border border-secondary p-2 rounded-md"
              >
                Kembali
              </button> */}
              <button
                type="submit"
                onClick={activeTab === "signup" ? handleSubmit : handleLogin}
                className="flex-1 bg-secondary p-2 rounded-md hover:bg-blue-950  "
              >
                {activeTab === "signup" ? "Sign Up" : "Login"}
              </button>
            </div>
            <div className="flex bg-blue-950 rounded-md font-bold">
              <button
                onClick={() => handleTabChange("signup")}
                className={`px-4 py-2 rounded-md flex-1 transition ${
                  activeTab === "signup" ? "bg-secondary text-white" : ""
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => handleTabChange("login")}
                className={`px-4 py-2 rounded-md flex-1 transition ${
                  activeTab === "login" ? "bg-secondary text-white" : ""
                }`}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DraftContent;
