import React, { useState, useEffect } from "react";
import Final from "../../assets/data/dataFilm.csv";
import Papa from "papaparse";
import Navbar from "../../components/organisms/Navbar";
import { FaPrint } from "react-icons/fa";

const TabBar = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="tab-bar flex  gap-3 overflow-y-auto    ">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={` bg-gray-800 text-white px-3 w-40 flex justify-center items-center   cursor-pointer rounded-md${
            index === activeTab ? " bg-red-900 w-40" : ""
          } `}
          onClick={() => onChange(index)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

function Genres() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const itemsPerPage = 30; // Ganti jumlah item per halaman sesuai kebutuhan
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Final);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value);
      const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
      }).data;

      // Transformasi data untuk menggabungkan kolom genre ke dalam satu array
      const transformedData = parsedData.map((row) => {
        const genres = [];
        for (let i = 1; i <= 8; i++) {
          const genreKey = `genre_${i}`;
          if (row[genreKey]) {
            genres.push(row[genreKey]);
          }
        }
        return {
          ...row,
          genres: genres,
        };
      });

      setData(transformedData);
    };
    fetchData();
  }, []);

  const allGenres = ["All", ...new Set(data.flatMap((item) => item.genres))];
  const filteredItems =
    activeTab === 0
      ? data.filter(
          (item) =>
            item.title &&
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : data
          .filter((item) => item.genres.includes(allGenres[activeTab]))
          .filter(
            (item) =>
              item.title &&
              item.title.toLowerCase().includes(searchTerm.toLowerCase())
          );

  const totalItems = filteredItems.length;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredItems.slice(firstIndex, lastIndex);
  const activeTabText =
    activeTab === 0
      ? "Menampilkan semua data"
      : `Filter by Genre: ${allGenres[activeTab]}`;

  const handleExportCSV = () => {
    // Assuming you want to export the entire data
    const csvData = Papa.unparse(data);

    // Create a Blob and a link to trigger the download
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exported_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Navbar />
      <div className="px-4 md:px-20 pt-[15vh] pb-[5vh] bg-red-900 min-h-screen ">
        <TabBar
          tabs={allGenres}
          activeTab={activeTab}
          onChange={(tabIndex) => {
            setCurrentPage(1);
            setActiveTab(tabIndex);
          }}
        />

        <div className=" flex justify-between items-center mt-4 w-full  flex-col md:flex-row gap-4">
          <div className=" text-white text-2xl ">{activeTabText}</div>
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-normal">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-2 py-1 border rounded-md"
            />
            <button
              className="flex gap-1 items-center bg-slate-800 text-white py-2 px-4 rounded-lg"
              onClick={handleExportCSV}
            >
              <FaPrint />
              <span className=" hidden md:block">Export CSV</span>
            </button>
          </div>
        </div>

        {data.length ? (
          <>
            {currentItems.length ? (
              <table className="table text-white">
                <thead className="">
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Genres</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1 + itemsPerPage * (currentPage - 1)}</td>
                      <td>{row.title}</td>
                      <td>{row.genres.join(", ")}</td>
                      <td>{Math.floor(row.rating)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className=" min-h-[50vh] flex justify-center items-center text-white font-semibold text-xl cards m-3 border border-white rounded-2xl">
                Data Yang dicari tidak ada
              </div>
            )}
            {currentItems.length === 0 || data.length === 0 ? null : (
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
            )}
          </>
        ) : null}
        <br />
      </div>
    </>
  );
}

export default Genres;
