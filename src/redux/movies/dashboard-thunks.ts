import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Movie } from "@/types";

export const fetchMovieData = createAsyncThunk(
  "dashboard/fetchMovieData",
  async () => {
    const response = await fetch("/api/guK8Sdo", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "same-origin",
    });

    if (!response.ok) throw new Error("Failed to fetch");

    const data: Movie[] = await response.json();

    const uniqueMovies = Array.from(
      new Set(data.map((m) => JSON.stringify(m)))
    ).map((s) => JSON.parse(s));

    return uniqueMovies;
  }
);
