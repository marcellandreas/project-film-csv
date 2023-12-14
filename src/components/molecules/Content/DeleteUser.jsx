import { MdPeople } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../apis";
import { CustomInput } from "../../atoms/FormAtoms";
const DeleteUser = ({ onClose, idUser, setIsLoading }) => {
  const [formValues, setFormValues] = useState({
    username: "",
  });

  useEffect(() => {
    AxiosInstance.get(`/auth/user/${idUser}`)
      .then((res) => {
        setFormValues({
          ...formValues,
          username: res.data.username,
        });
      })
      .catch((err) => alert(err));
  }, [idUser]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosInstance.delete(`/auth/user/${idUser}`);
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
          <h1 className=" text-2xl font-bold text-center ">Hapus User</h1>
          <hr className=" border-1 border-secondary" />
        </div>
        <form onSubmit={handleDelete} className="flex flex-col gap-2">
          <CustomInput
            label="Username"
            value={formValues.username}
            icon={MdPeople}
            readOnly={true}
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
              Ya, Hapus User
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DeleteUser;
