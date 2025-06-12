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
      <Route path="/hero" element={<HeroPage />} />
      <Route path="/edit" element={<EditHeroPage />} />
      <Route path="/add" element={<AddHeroPage />} />
    </Routes>
  );
}

export default App;
