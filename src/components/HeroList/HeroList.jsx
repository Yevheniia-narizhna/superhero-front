import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHeroes } from "../../redux/hero/operations";
import { Link, useSearchParams } from "react-router-dom";

const HeroList = () => {
  const dispatch = useDispatch();
  const { heroes, totalPages, loading } = useSelector((state) => state.hero);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    dispatch(getAllHeroes({ page, limit: 5 }));
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ul>
        {heroes.map((hero) => (
          <li key={hero._id}>
            <img
              src={hero.images?.[0]}
              alt={hero.nickname}
              width={100}
              height="auto"
            />
            <p>{hero.nickname}</p>
            <Link to={`/hero/${hero._id}`}>
              <button>Show more</button>
            </Link>
          </li>
        ))}
      </ul>

      <div>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HeroList;
