import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getHeroById } from "../../redux/hero/operations";

const HeroCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentHero, loading } = useSelector((state) => state.hero);

  useEffect(() => {
    dispatch(getHeroById(id));
  }, [dispatch, id]);

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
        <img key={i} src={img} alt={`${nickname} ${i}`} width={200} />
      ))}
      <Link to="edit">Edit this hero</Link>
    </div>
  );
};

export default HeroCard;
