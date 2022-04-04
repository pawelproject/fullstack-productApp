import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/users",
  }),
  endpoints: (builder) => ({
    authenticate: builder.mutation({
      query: ({ isLoginMode, ...body }) => ({
        url: isLoginMode ? `signin` : "signup",
        method: "POST",
        body: body,
      }),
    }),
    verifyToken: builder.mutation({
      query: (token: string) => ({
        url: "token",
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useAuthenticateMutation, useVerifyTokenMutation } = authApi;
