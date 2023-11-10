import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardList from "./BoardList";
import Write from "./Write";
import Read from "./Read";
import Modify from "./Modify";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BoardList />} />
          <Route path="/write" element={<Write />} />
          <Route path="/read/:id" element={<Read />} />
          <Route path="/modify/:id" element={<Modify />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
