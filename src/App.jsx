import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import HeroPage from "./pages/HeroPage";
import EditHeroPage from "./pages/EditHeroPage";
import AddHeroPage from "./pages/AddHeroPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add" element={<AddHeroPage />} />
      <Route path="/hero/:id" element={<HeroPage />} />
      <Route path="/hero/:id/edit" element={<EditHeroPage />} />
    </Routes>
  );
}

export default App;
