import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
});

export const ApiService = createApi({
  baseQuery,
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks" , "Users" , "Teams"],
  endpoints: (build) => ({}),
});
