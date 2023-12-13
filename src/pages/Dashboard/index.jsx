import React, { useEffect, useState } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { AxiosInstance } from "../../components/apis";
import Sidebar from "../../components/organisms/Sidebar";
import { TabBar } from "../../components/molecules/Tabbar";
import ShowModal from "../../components/organisms/ShowModals";
import Modals from "../../helpers/modals";
import AddUser from "../../components/molecules/Content/AddUser";
import EditUser from "../../components/molecules/Content/EditUser";
import DeleteUser from "../../components/molecules/Content/DeleteUser";

const DashboardAdmin = () => {
  const allGenres = ["Data Users", "Activity"];
  const [activeTab, setActiveTab] = useState(0);

  const { modalState, showModal, closeModal } = Modals();

  const [dataMovies, setDataMovies] = useState([]);
  const [logLoginData, setLogLoginData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await AxiosInstance.get(`auth/allusers`);
        const res2 = await AxiosInstance.get(`type`);
        setDataMovies(res.data);
        setLogLoginData(res2.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [isLoading]);

  const dataUsername = [];
  dataMovies.forEach((data) => {
    dataUsername.push(data.username);
  });

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

  const [idUser, setIdUser] = useState(null);
  return (
    <>
      <div className="flex w-full min-h-screen">
        <Sidebar />
        <div className="flex flex-col w-full bg-gray-500">
          <div className="m-3 h-[10vh] flex justify-between items-center bg-red-900 rounded-xl border-b-white sticky top-0 z-10 p-4">
            <h2 className=" text-xl font-semibold  text-white ">Data Users</h2>
            <button
              onClick={() => showModal("add")}
              className=" bg-slate-600 p-2 rounded-md text-white hover:border hover:border-slate-900 hover:bg-transparent flex gap-1 items-center"
            >
              <MdAdd className=" border border-slate-900 rounded-full" />
              Tambah User
            </button>
          </div>
          <div className="px-3  h-auto flex  flex-wrap">
            <TabBar
              tabs={allGenres}
              activeTab={activeTab}
              onChange={(tabIndex) => {
                setCurrentPage(1);
                setActiveTab(tabIndex);
              }}
            />
          </div>
          <div className=" p-3">
            {activeTab === 1 ? (
              <div className=" bg-slate-400 overflow-x-auto w-full   rounded-xl  p-2 flex flex-col gap-3">
                <table className="table   text-white min-h-[240px] max-h-[240px]">
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
              <div className=" bg-slate-600 overflow-x-auto rounded-xl w-full min-h-[80vh] p-2  flex-col flex gap-3  ">
                <table className="text-white min-h-[240px] max-h-[240px]">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Username</th>
                      <th>Nama Lengkap</th>
                      <th>Email</th>
                      <th>Created at:</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((row, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {index + 1 + itemsPerPageLog * (currentPageLog - 1)}
                          </td>
                          <td>{row.username}</td>
                          <td>{row.full_name}</td>
                          <td>{row.email}</td>
                          <td>{row.created_at}</td>
                          <td>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setIdUser(row.id_user);
                                  showModal("edit");
                                }}
                                className=" bg-blue-700 p-2 rounded-full"
                              >
                                <MdEdit />
                              </button>
                              <button
                                onClick={() => {
                                  setIdUser(row.id_user);
                                  showModal("delete");
                                }}
                                className=" bg-red-700 p-2 rounded-full"
                              >
                                <MdDelete />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

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
      <ShowModal isVisible={modalState.add} onClose={() => closeModal("add")}>
        <AddUser
          setIsLoading={setIsLoading}
          onClose={() => closeModal("add")}
        />
      </ShowModal>
      <ShowModal isVisible={modalState.edit} onClose={() => closeModal("edit")}>
        <EditUser
          setIsLoading={setIsLoading}
          idUser={idUser}
          onClose={() => closeModal("edit")}
        />
      </ShowModal>
      <ShowModal
        setIsLoading={setIsLoading}
        isVisible={modalState.delete}
        onClose={() => closeModal("delete")}
      >
        <DeleteUser
          setIsLoading={setIsLoading}
          idUser={idUser}
          onClose={() => closeModal("delete")}
        />
      </ShowModal>
    </>
  );
};

export default DashboardAdmin;
