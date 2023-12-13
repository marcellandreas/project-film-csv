import { useEffect, useState } from "react";
import Navbar from "../../components/organisms/Navbar";
import { AxiosInstance } from "../../components/apis";

const Account = () => {
  const idUser = localStorage.getItem("id_user");
  const username = localStorage.getItem("username");
  const [formValues, setFormValues] = useState({
    username: "",
    full_name: "",
    email: "",
    role: 2,
  });

  console.log(formValues);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get("auth/profile");
        setFormValues({
          username: response.data.username,
          full_name: response.data.full_name,
          email: response.data.email,
          role: response.data.role, // Assuming 'role' is present in the response
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await AxiosInstance.put(
        `/auth/user/${idUser}`,
        formValues
      );
      alert("sudah berhasil");
    } catch (error) {
      alert("belum berhasil");
    }
  };

  return (
    <>
      <Navbar />
      <section className="px-4 pt-[15vh] sm:px-2 md:px-40  bg-red-900 text-white flex  min-h-screen ">
        <div className=" bg-white text-black rounded-xl w-[800px] h-80 mx-auto p-4">
          <div className="mb-2">
            <h1 className="text-2xl font-bold  mb-3 text-center">Profile</h1>
            <hr />
          </div>
          <div className=" grid gap-3 grid-flow-dense grid-cols-1">
            <div className="flex justify-center flex-col">
              <label className="text-black font-semibold"> Username</label>
              <input
                readOnly
                value="username"
                className=" bg-gray-300 outline-none pl-2 h-[5vh] rounded-md"
              />
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-black font-semibold">Nama Lengkap</label>
              <input
                type="text"
                name="full_name"
                onChange={handleChangeInput}
                value={formValues.full_name}
                className=" bg-gray-300 outline-none pl-2 h-[5vh] rounded-md"
              />
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-black font-semibold">Email</label>
              <input
                type="text"
                name="email"
                onChange={handleChangeInput}
                value={formValues.email}
                className=" bg-gray-300 outline-none pl-2 h-[5vh] rounded-md"
              />
            </div>
            <button
              onClick={handleUpdate}
              className=" bg-teal-700 hover:bg-teal-500 h-[6vh] font-semibold rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Account;
