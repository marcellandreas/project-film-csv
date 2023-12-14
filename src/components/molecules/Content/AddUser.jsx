import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdEmail, MdPeople } from "react-icons/md";
import React, { useState } from "react";
import { AxiosInstance } from "../../apis";
import { CustomInput } from "../../atoms/FormAtoms";
const AddUser = ({ onClose, setIsLoading }) => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    full_name: "",
    email: "",
    role: "2",
  });

  const handleInputChangeRegister = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosInstance.post(`/auth/register`, formValues);

      if (
        Object.values(formValues).some((value) => value == null || value === "")
      ) {
        alert("Mohon isi semua kolom yang diperlukan");
        return;
      }

      if (response.data) {
        alert(response.data.message);
        onClose();
        setIsLoading(true);
      } else {
        alert("Unexpected response format");
      }
    } catch (error) {
      alert(error.message);
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

      <div>
        <div className=" mb-3">
          <h1 className=" text-2xl font-bold text-center ">Tambah Users</h1>
          <hr className=" border-1 border-secondary" />
        </div>
        <form
          action="/submit"
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
        >
          <div className="flex gap-2 text-black">
            <label>Access:</label>
            <select
              value={formValues.role}
              onChange={handleInputChangeRegister}
              name="role"
            >
              <option value="2">User</option>
              <option value="1">Admin</option>
            </select>
          </div>
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
            icon={MdPeople}
            dataLabel={formValues.full_name}
            onChange={handleInputChangeRegister}
          />

          <CustomInput
            type="text"
            label="Username"
            name="username"
            placeholder="masukan username"
            icon={MdPeople}
            dataLabel={formValues.username}
            onChange={handleInputChangeRegister}
          />

          <div className=" flex flex-col gap-1 relative">
            <label>
              Password <span className="text-red-700">*</span>
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
          <div className="w-full flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 border rounded-lg font-semibold hover:bg-gray-600  border-white"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="flex-1 bg-gray-600 py-2 rounded-lg font-semibold hover:border hover:border-white hover:bg-transparent"
            >
              Tambah User
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddUser;
