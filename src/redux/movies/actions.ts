import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Movie } from "@/types";

const API_URL = "https://movie-dashboard-api.vercel.app/";

export const fetchMovieData = createAsyncThunk(
  "dashboard/fetchMovieData",
  async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message ?? "Failed to fetch movie data");
    }

    const data: Movie[] = await response.json();

    const uniqueMovies = Array.from(
      new Set(data.map((m) => JSON.stringify(m)))
    ).map((s) => JSON.parse(s));

    return uniqueMovies;
  }
);
