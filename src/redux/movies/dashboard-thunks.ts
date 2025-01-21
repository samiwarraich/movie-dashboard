import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Movie } from "@/types";

const BASE_URL = import.meta.env.PROD
  ? "https://www.jsondataai.com/api"
  : "/api";

export const fetchMovieData = createAsyncThunk(
  "dashboard/fetchMovieData",
  async () => {
    const response = await fetch(`${BASE_URL}/guK8Sdo`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch");

    const data: Movie[] = await response.json();

    const uniqueMovies = Array.from(
      new Set(data.map((m) => JSON.stringify(m)))
    ).map((s) => JSON.parse(s));

    return uniqueMovies;
  }
);
