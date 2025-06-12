import { createSlice } from "@reduxjs/toolkit";
import {
  createHero,
  deleteHero,
  getHeroById,
  getAllHeroes,
  updateHero,
} from "./operations";

const initialState = {
  heroes: [],
  currentHero: null,
  page: 1,
  totalPages: 1,
  totalHeroes: 0,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "hero",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllHeroes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllHeroes.fulfilled, (state, action) => {
        state.loading = false;
        state.heroes = action.payload.heroes;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.totalHeroes = action.payload.totalHeroes;
      })
      .addCase(getAllHeroes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getHeroById.fulfilled, (state, action) => {
        state.currentHero = action.payload;
      })
      .addCase(createHero.fulfilled, (state, action) => {
        state.heroes.unshift(action.payload);
      })
      .addCase(updateHero.fulfilled, (state, action) => {
        const index = state.heroes.findIndex(
          (h) => h._id === action.payload._id
        );
        if (index !== -1) state.heroes[index] = action.payload;
      })
      .addCase(deleteHero.fulfilled, (state, action) => {
        state.heroes = state.heroes.filter((h) => h._id !== action.payload);
      });
  },
});
export const heroReducer = slice.reducer;
