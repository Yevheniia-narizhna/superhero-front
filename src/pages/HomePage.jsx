import { Link } from "react-router-dom";
import HeroList from "../components/HeroList/HeroList";

const HomePage = () => {
  return (
    <>
      <Link to="/add">
        <button>Add Hero</button>
      </Link>
      <HeroList />
    </>
  );
};

export default HomePage;
