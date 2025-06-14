import { createAsyncThunk } from "@reduxjs/toolkit";
import { heroApi } from "./heroApi";
// import axios from "axios";

// export const heroApi = axios.create({
//   baseURL: "http://localhost:32307",
// });

export const getAllHeroes = createAsyncThunk(
  "hero/getAll",
  async ({ page = "", limit = 5 }, { rejectWithValue }) => {
    try {
      const res = await heroApi.get(`/hero?page=${page}&limit=${limit}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const getHeroById = createAsyncThunk("hero/getById", async (id) => {
  const res = await heroApi.get(`/hero/${id}`);
  return res.data;
});

export const createHero = createAsyncThunk("hero/create", async (formData) => {
  const res = await heroApi.post("/hero", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
});

export const updateHero = createAsyncThunk(
  "hero/update",
  async ({ id, formData }) => {
    const res = await heroApi.put(`/hero/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
);

export const deleteHero = createAsyncThunk("hero/delete", async (id) => {
  await heroApi.delete(`/hero/${id}`);
  return id;
});
