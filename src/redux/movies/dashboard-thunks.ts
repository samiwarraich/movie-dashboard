import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Movie } from "@/types";

const apiUrl = import.meta.env.DEV
  ? "/api/guK8Sdo"
  : "https://www.jsondataai.com/api/guK8Sdo";

export const fetchMovieData = createAsyncThunk(
  "dashboard/fetchMovieData",
  async () => {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
    });

    if (!response.ok) throw new Error("Failed to fetch");

    const data: Movie[] = await response.json();

    const uniqueMovies = Array.from(
      new Set(data.map((m) => JSON.stringify(m)))
    ).map((s) => JSON.parse(s));

    return uniqueMovies;
  }
);
