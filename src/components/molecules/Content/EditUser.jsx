import { MdEmail, MdPeople } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../apis";
import { CustomInput } from "../../atoms/FormAtoms";
const EditUser = ({ onClose, idUser }) => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    full_name: "",
    email: "",
    role: "2",
  });
  useEffect(() => {
    AxiosInstance.get(`/auth/user/${idUser}`)
      .then((res) => {
        setFormValues({
          ...formValues,
          username: res.data.username,
          full_name: res.data.full_name,
          email: res.data.email,
          role: res.data.role,
        });
      })
      .catch((err) => alert(err));
  }, [idUser]);

  const handleInputChangeRegister = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosInstance.put(
        `/auth/user/${idUser}`,
        formValues
      );
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
          <h1 className=" text-2xl font-bold text-center ">Edit User</h1>
          <hr className=" border-1 border-secondary" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
            value={formValues.email}
            placeholder="masukan nama email"
            icon={MdEmail}
            dataLabel={formValues.email}
            onChange={handleInputChangeRegister}
          />
          <CustomInput
            type="text"
            label="Full Name"
            name="full_name"
            value={formValues.full_name}
            placeholder="masukan nama lengkap"
            icon={MdPeople}
            dataLabel={formValues.full_name}
            onChange={handleInputChangeRegister}
          />

          <CustomInput
            type="text"
            label="Username"
            name="username"
            value={formValues.username}
            placeholder="masukan username"
            icon={MdPeople}
            dataLabel={formValues.username}
            onChange={handleInputChangeRegister}
          />

          <div className="w-full flex gap-2">
            <button
              type="button"
              className="flex-1 py-2 border rounded-lg font-semibold hover:bg-gray-600  border-white"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="flex-1 bg-gray-600 py-2 rounded-lg font-semibold hover:border hover:border-white hover:bg-transparent"
            >
              Ya Edit User
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditUser;
