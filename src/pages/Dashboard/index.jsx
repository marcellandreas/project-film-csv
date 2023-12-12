import React, { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { AxiosInstance } from "../../components/apis";
import Sidebar from "../../components/organisms/Sidebar";
import { TabBar } from "../../components/molecules/Tabbar";

const DashboardAdmin = () => {
  const allGenres = ["Data Users", "Manage Log login"];
  const [activeTab, setActiveTab] = useState(0);

  const [dataMovies, setDataMovies] = useState([]);
  const [logLoginData, setLogLoginData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await AxiosInstance.get(`auth/allusers`);
        const res2 = await AxiosInstance.get(`type`);
        console.log(res.data);
        setDataMovies(res.data);
        setLogLoginData(res2.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const dataUsername = [];
  dataMovies.forEach((data) => {
    dataUsername.push(data.username);
  });

  console.log(dataUsername);
  const totalItems = dataMovies.length;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  //   const data = Array.from({ length: 20 }, (_, index) => index + 1);

  const currentItems = dataMovies.slice(firstIndex, lastIndex);

  const [currentPageLog, setCurrentPageLog] = useState(1);
  const itemsPerPageLog = 6;
  const totalItemsLog = logLoginData.length;
  const lastIndexLog = currentPageLog * itemsPerPageLog;
  const firstIndexLog = lastIndexLog - itemsPerPageLog;
  const currentItemsLog = logLoginData.slice(firstIndexLog, lastIndexLog);
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className=" w-full bg-gray-200">
          <div className=" m-3 h-[10vh] flex justify-between items-center bg-red-900 rounded-xl border-b-white sticky top-0 z-10 p-4">
            <h2 className=" text-xl font-semibold  text-white ">Data Users</h2>
            <button className=" bg-slate-600 p-2 rounded-md text-white hover:border hover:border-slate-900 hover:bg-transparent flex gap-1 items-center">
              <MdAdd className=" border border-slate-900 rounded-full" />
              Tambah User
            </button>
          </div>
          <div className="px-3">
            <TabBar
              tabs={allGenres}
              activeTab={activeTab}
              onChange={(tabIndex) => {
                setCurrentPage(1);
                setActiveTab(tabIndex);
              }}
            />
          </div>
          <div className=" p-3 bg-gray-200 ">
            {activeTab === 1 ? (
              <div className=" bg-slate-400 rounded-xl  p-2 flex flex-col gap-3">
                <table className="table text-white min-h-[240px] max-h-[240px]">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>User</th>
                      <th>Action Type</th>
                      <th>Action Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItemsLog.map((row, index) => {
                      const user = dataMovies.find(
                        (userData) => userData.id_user === row.id_user
                      );

                      return (
                        <tr key={index}>
                          <td>
                            {index + 1 + itemsPerPageLog * (currentPageLog - 1)}
                          </td>
                          <td>{user ? user.username : "Unknown User"}</td>
                          <td>{row.action_type}</td>
                          <td>{row.action_time}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className=" text-center flex  justify-center items-center gap-3">
                  <button
                    className=" disabled:bg-gray-600 text-white p-2 rounded-md font-semibold border border-black "
                    onClick={() => setCurrentPageLog(currentPageLog - 1)}
                    disabled={currentPageLog === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="disabled:bg-gray-600  p-2 rounded-md font-semibold border border-black text-white"
                    onClick={() => setCurrentPageLog(currentPageLog + 1)}
                    disabled={lastIndexLog >= totalItemsLog}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <div className=" bg-slate-600 rounded-xl min-h-[80vh] p-2 flex-col flex gap-3">
                {currentItems.map((data, index) => {
                  return (
                    <section className=" bg-white  text-black text-lg p-2 justify-center items-center grid grid-cols-12 grid-flow-dense gap-3 rounded-md">
                      <div className=" flex flex-col col-span-1">
                        <h2 className="text-base font-semibold">Id</h2>
                        <span className=" text-slate-500 font-semibold text-base">
                          {index + 1}
                        </span>
                      </div>
                      <div className=" flex flex-col col-span-3">
                        <h2 className="text-base font-semibold">Username</h2>
                        <span className=" text-slate-500 font-semibold text-base">
                          Marcell Andreas Samadhani dUHA
                        </span>
                      </div>
                      <div className=" flex flex-col col-span-3">
                        <h2 className="text-base font-semibold">
                          Nama Lengkap
                        </h2>
                        <span className=" text-slate-500 font-semibold text-base">
                          Marcell Andreas Samadhani dUHA
                        </span>
                      </div>
                      <div className=" flex flex-col col-span-3">
                        <h2 className="text-base font-semibold">Email</h2>
                        <span className=" text-slate-500 font-semibold text-base">
                          Marcell Andreas Samadhani dUHA
                        </span>
                      </div>
                      <div className=" flex flex-col col-span-2 justify-end items-end">
                        <h2 className="text-base font-semibold">Aksi</h2>
                        <div className=" flex gap-2 text-slate-500 font-semibold text-base">
                          <button className=" bg-blue-800 text-white text-lg rounded-xl p-2">
                            <MdEdit />
                          </button>
                          <button className="bg-red-800 text-white text-lg rounded-xl p-2">
                            <MdDelete />
                          </button>
                        </div>
                      </div>
                    </section>
                  );
                })}
                <div className=" text-center flex  justify-center items-center gap-3">
                  <button
                    className=" disabled:bg-gray-600 text-white p-2 rounded-md font-semibold border border-black "
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="disabled:bg-gray-600  p-2 rounded-md font-semibold border border-black text-white"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={lastIndex >= totalItems}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
