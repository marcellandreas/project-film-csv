import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Genres from "../pages/Genres";
import DetailPopuler from "../components/Populer/detailPopuler";
import MorePopuler from "../components/Populer/MorePopoler";
import Account from "../pages/account";
import DashboardAdmin from "../pages/Dashboard";
import { useEffect, useState } from "react";

const Routers = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const isAdmin = role === "admin";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/account" element={<Account />} />
        <Route path="/more-populer" element={<MorePopuler />} />
        <Route
          path="/more-populer/detail/:filmId"
          element={<DetailPopuler />}
        />

        {isAdmin && (
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
