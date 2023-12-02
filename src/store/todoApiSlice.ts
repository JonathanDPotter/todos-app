import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../config";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.server_url,
  }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (id) => `/api/todos/${id}`,
    }),
  }),
});

export const { useGetTodosQuery } = todoApi;
