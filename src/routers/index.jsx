import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Genres from "../pages/Genres";
import DetailPopuler from "../components/Populer/detailPopuler";
import MorePopuler from "../components/Populer/MorePopoler";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Landing />} />
        </Route>
        <Route path="/genres">
          <Route index element={<Genres />} />
        </Route>
        <Route path="/more-populer">
          <Route index element={<MorePopuler />} />
          <Route path="detail/:filmId" element={<DetailPopuler />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
