import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server_url } from "../api";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: server_url,
  }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (id) => `/api/todos/${id}`,
    }),
  }),
});

export const { useGetTodosQuery } = todoApi;
