import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import React, { useState } from "react";
import { AxiosInstance } from "../../apis";
import { CustomInput } from "../../atoms/FormAtoms";
import { useNavigate } from "react-router-dom";
const SignUp = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("login");

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    full_name: "",
    email: "",
    role: 2,
  });

  const handleInputChangeRegister = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const [username, setusername] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosInstance.post(`/auth/register`, formValues);

      if (response.data) {
        alert(response.data.message);
        onClose();
      } else {
        alert("Unexpected response format");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await AxiosInstance.post(`/auth/login`, {
        username: username,
        password: password,
      });
      const { token, username: asd, id_user, role } = response.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", asd);
      if (role === 1) {
        navigate("/dashboard-admin");
        localStorage.setItem("role", "admin");
      } else {
        navigate("/");
        localStorage.setItem("role", "user");
      }
      alert("anda berhasil login");
      onClose();
    } catch (error) {
      alert("Login Gagal. Periksa kembali username dan password.");
    }
  };

  return (
    <section className="w-[400px] bg-red-900 z-50 rounded-lg p-3 relative text-white">
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
                <CustomInput
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="masukan nama email"
                  icon={MdEmail}
                  dataLabel={formValues.email}
                  onChange={handleInputChangeRegister}
                />
                <CustomInput
                  type="text"
                  label="Full Name"
                  name="full_name"
                  placeholder="masukan nama lengkap"
                  icon={MdEmail}
                  dataLabel={formValues.full_name}
                  onChange={handleInputChangeRegister}
                />
                <CustomInput
                  type="text"
                  label="Username"
                  name="username"
                  placeholder="masukan username"
                  icon={MdEmail}
                  dataLabel={formValues.username}
                  onChange={handleInputChangeRegister}
                />

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
                    onChange={(e) => handleInputChangeRegister(e)}
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
                    Username{" "}
                    {username === "" && <span className="text-red-700">*</span>}
                  </label>
                  <input
                    type="text"
                    placeholder="Masukan Username"
                    name="username "
                    className={`p-2 text-black outline-none rounded-lg`}
                    onChange={(e) => setusername(e.target.value)}
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

export default SignUp;
