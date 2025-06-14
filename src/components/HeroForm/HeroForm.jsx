import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createHero,
  getHeroById,
  updateHero,
} from "../../redux/hero/operations";
import s from "./HeroForm.module.css";

const HeroForm = ({ mode = "create" }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentHero, loading } = useSelector((state) => state.hero);

  const [form, setForm] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
    existingImages: [],
    newImages: [],
  });

  useEffect(() => {
    if (mode === "edit") {
      dispatch(getHeroById(id));
    }
  }, [dispatch, id, mode]);

  useEffect(() => {
    if (mode === "edit" && currentHero) {
      setForm({
        nickname: currentHero.nickname,
        real_name: currentHero.real_name,
        origin_description: currentHero.origin_description,
        superpowers: currentHero.superpowers,
        catch_phrase: currentHero.catch_phrase,
        existingImages: currentHero.images || [],
        newImages: [],
      });
    }
  }, [currentHero, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      newImages: [...prev.newImages, ...e.target.files],
    }));
  };

  const handleRemoveImage = (url) => {
    setForm((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((img) => img !== url),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("nickname", form.nickname);
    formData.append("real_name", form.real_name);
    formData.append("origin_description", form.origin_description);
    formData.append("superpowers", form.superpowers);
    formData.append("catch_phrase", form.catch_phrase);

    if (mode === "edit") {
      formData.append("images", JSON.stringify(form.existingImages));
    }

    form.newImages.forEach((file) => {
      formData.append("images", file);
    });

    if (mode === "edit") {
      dispatch(updateHero({ id, formData })).then(() =>
        navigate(`/hero/${id}`)
      );
    } else {
      dispatch(createHero(formData)).then((res) =>
        navigate(`/hero/${res.payload._id}`)
      );
    }
  };

  if (mode === "edit" && (loading || !currentHero)) return <p>Loading...</p>;

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <input
        name="nickname"
        value={form.nickname}
        onChange={handleChange}
        placeholder="Nickname"
      />
      <input
        name="real_name"
        value={form.real_name}
        onChange={handleChange}
        placeholder="Real name"
      />
      <textarea
        name="origin_description"
        value={form.origin_description}
        onChange={handleChange}
        placeholder="Origin description"
      />
      <input
        name="superpowers"
        value={form.superpowers}
        onChange={handleChange}
        placeholder="Superpowers"
      />
      <input
        name="catch_phrase"
        value={form.catch_phrase}
        onChange={handleChange}
        placeholder="Catch phrase"
      />

      {mode === "edit" && (
        <>
          <p>Existing Images:</p>
          <div className={s.images}>
            {form.existingImages.map((img, idx) => (
              <div className={s.container} key={idx}>
                <img src={img} alt="hero" width={100} />
                <button type="button" onClick={() => handleRemoveImage(img)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      />
      <button type="submit">{mode === "edit" ? "Save" : "Add Hero"}</button>
    </form>
  );
};

export default HeroForm;

// const HeroForm = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { currentHero, loading } = useSelector((state) => state.hero);

//   const [form, setForm] = useState({
//     nickname: "",
//     real_name: "",
//     origin_description: "",
//     superpowers: "",
//     catch_phrase: "",
//     existingImages: [],
//     newImages: [],
//   });

//   useEffect(() => {
//     dispatch(getHeroById(id));
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (currentHero) {
//       setForm({
//         nickname: currentHero.nickname,
//         real_name: currentHero.real_name,
//         origin_description: currentHero.origin_description,
//         superpowers: currentHero.superpowers,
//         catch_phrase: currentHero.catch_phrase,
//         existingImages: currentHero.images || [],
//         newImages: [],
//       });
//     }
//   }, [currentHero]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setForm((prev) => ({
//       ...prev,
//       newImages: [...prev.newImages, ...e.target.files],
//     }));
//   };

//   const handleRemoveImage = (url) => {
//     setForm((prev) => ({
//       ...prev,
//       existingImages: prev.existingImages.filter((img) => img !== url),
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     formData.append("nickname", form.nickname);
//     formData.append("real_name", form.real_name);
//     formData.append("origin_description", form.origin_description);
//     formData.append("superpowers", form.superpowers);
//     formData.append("catch_phrase", form.catch_phrase);
//     formData.append("images", JSON.stringify(form.existingImages));

//     form.newImages.forEach((file) => {
//       formData.append("images", file);
//     });

//     dispatch(updateHero({ id, formData })).then(() => navigate(`/hero/${id}`));
//   };

//   if (loading || !currentHero) return <p>Loading...</p>;

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         name="nickname"
//         value={form.nickname}
//         onChange={handleChange}
//         placeholder="Nickname"
//       />
//       <input
//         name="real_name"
//         value={form.real_name}
//         onChange={handleChange}
//         placeholder="Real name"
//       />
//       <textarea
//         name="origin_description"
//         value={form.origin_description}
//         onChange={handleChange}
//         placeholder="Origin description"
//       />
//       <input
//         name="superpowers"
//         value={form.superpowers}
//         onChange={handleChange}
//         placeholder="Superpowers"
//       />
//       <input
//         name="catch_phrase"
//         value={form.catch_phrase}
//         onChange={handleChange}
//         placeholder="Catch phrase"
//       />

//       <div>
//         <p>Existing Images:</p>
//         {form.existingImages.map((img, idx) => (
//           <div key={idx}>
//             <img src={img} alt="hero" width={100} />
//             <button type="button" onClick={() => handleRemoveImage(img)}>
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       <input
//         type="file"
//         multiple
//         accept="image/*"
//         onChange={handleFileChange}
//       />

//       <button type="submit">Save changes</button>
//     </form>
//   );
// };

// export default HeroForm;
