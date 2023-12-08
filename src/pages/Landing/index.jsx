import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Navbar from "../../components/organisms/Navbar";
import Data from "../../assets/data/rata_rata_per_judul_film.csv";
import Populer from "../../components/Populer";
import Banner from "../../components/molecules/Banner";
import { FaLongArrowAltDown, FaLongArrowAltUp, FaPrint } from "react-icons/fa";

const Landing = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("highest"); // "highest" or "lowest"
  const itemsPerPage = 50;

  const filteredData = data
    .filter((row) => {
      const lowerCasedTitle = row.judul_film.toLowerCase();
      const ratingAsString = Math.floor(row.rating).toString();

      return (
        lowerCasedTitle.includes(searchTerm.toLowerCase()) ||
        ratingAsString.includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (filterType === "highest") {
        return b.rating - a.rating;
      } else if (filterType === "lowest") {
        return a.rating - b.rating;
      }
      return 0;
    });

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredData.slice(firstIndex, lastIndex);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Data);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value);
      const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
      }).data;
      setData(parsedData);
    };
    fetchData();
  }, []);

  const alertButton = () => {
    alert("Download Here");
  };

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
    <section>
      <Navbar />
      <div className=" py-[10vh] bg-red-900">
        <Banner />
        <section className="min-h-screen   md:px-20 px-4 text-white">
          <Populer />
          <div className="my-4 flex w-full items-center justify-between flex-col md:flex-row gap-4">
            <h2 className="text-2xl md:text-3xl capitalize touch-pan-up">
              Movie by Rating
            </h2>
            <div className="flex gap-3 w-full md:w-auto justify-between md:justify-normal">
              <div className=" flex gap-1">
                <button
                  className={`p-2 rounded-md border border-white  ${
                    filterType === "highest" ? "bg-gray-600 text-white" : ""
                  }`}
                  onClick={() => setFilterType("highest")}
                >
                  <FaLongArrowAltUp />
                </button>
                <button
                  className={`p-2 rounded-md border border-white ${
                    filterType === "lowest" ? "bg-gray-600 text-white" : ""
                  }`}
                  onClick={() => setFilterType("lowest")}
                >
                  <FaLongArrowAltDown />
                </button>
              </div>
              <input
                type="text"
                placeholder="Search by Title & Rating"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 rounded-md border self-end border-white text-black"
              />
              <a
                href="https://www.netflix.com/id-en/"
                target="_blank"
                className="flex gap-1 items-center bg-slate-700 px-4 py-2 rounded-md"
                rel="noopener noreferrer"
                onClick={() => {
                  alertButton();
                  handleExportCSV();
                }}
              >
                <FaPrint />
                <span className=" hidden md:block">Export CSV</span>
              </a>
            </div>
          </div>
          {filteredData.length ? (
            <table className="table text-white">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Title Movie</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1 + itemsPerPage * (currentPage - 1)}</td>
                    <td>{row.judul_film}</td>
                    <td>{row.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className=" min-h-[60vh] flex justify-center items-center">
              Tidak Menemukan Yang sedang dicari
            </div>
          )}
          {filteredData.length ? (
            <div className="text-center flex justify-center items-center gap-3 mt-4">
              <button
                className="disabled:bg-gray-600 text-white p-2 rounded-md font-semibold border border-black"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="disabled:bg-gray-600 p-2 rounded-md font-semibold border border-black text-white"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={lastIndex >= filteredData.length}
              >
                Next
              </button>
            </div>
          ) : null}
        </section>
      </div>
    </section>
  );
};

export default Landing;
