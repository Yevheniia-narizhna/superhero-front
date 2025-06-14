import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteHero, getHeroById } from "../../redux/hero/operations";
import s from "./HeroCard.module.css";
const HeroCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentHero, loading } = useSelector((state) => state.hero);

  useEffect(() => {
    dispatch(getHeroById(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm("Delete this hore?")) {
      dispatch(deleteHero(id)).then(() => navigate("/"));
    }
  };

  if (loading || !currentHero) return <p>Loading...</p>;

  const {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images,
  } = currentHero;

  return (
    <div>
      <Link to="/">
        <button>Back</button>
      </Link>
      <h2>{nickname}</h2>
      <p>
        <strong>Real Name:</strong> {real_name}
      </p>
      <p>
        <strong>Origin:</strong> {origin_description}
      </p>
      <p>
        <strong>Superpowers:</strong> {superpowers}
      </p>
      <p>
        <strong>Catch phrase:</strong> {catch_phrase}
      </p>
      {images?.map((img, i) => (
        <img
          className={s.img}
          key={i}
          src={img}
          alt={`${nickname} ${i}`}
          width={200}
        />
      ))}
      <div style={{ marginTop: "1rem" }}>
        <Link to="edit">
          <button>Edit this hero</button>
        </Link>
        <button
          onClick={handleDelete}
          style={{ marginLeft: "1rem", color: "red" }}
        >
          Delete hero
        </button>
      </div>
    </div>
  );
};

export default HeroCard;
