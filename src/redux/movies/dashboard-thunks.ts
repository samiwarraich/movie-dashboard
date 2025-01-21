import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Movie } from "@/types";

const API_URL = import.meta.env.DEV
  ? "/api/guK8Sdo" // Will be proxied in development
  : "https://www.jsondataai.com/api/guK8Sdo"; // Direct URL in production

export const fetchMovieData = createAsyncThunk(
  "dashboard/fetchMovieData",
  async () => {
    const response = await fetch(API_URL, {
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
