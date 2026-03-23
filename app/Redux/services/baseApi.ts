// import { fetchBaseQuery } from "@reduxjs/toolkit/query";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:4000",
//   credentials: "include",

//   prepareHeaders: (headers) => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");

//       if (token) {
//         headers.set("x-access-token", token);
//       }
//     }
//     return headers;
//   },
// });

// // 🔥 GLOBAL LOCK (IMPORTANT)
// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (token) {
//       prom.resolve(token);
//     } else {
//       prom.reject(error);
//     }
//   });

//   failedQueue = [];
// };

// // 🔥 FINAL REAUTH LOGIC
// export const baseQueryWithReauth = async (
//   args: any,
//   api: any,
//   extraOptions: any
// ) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 403) {
//     console.log("🔄 Token expired");

//     // 🔥 already refreshing
//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         failedQueue.push({
//           resolve: (token: string) => {
//             args.headers = {
//               ...(args.headers || {}),
//               "x-access-token": token,
//             };
//             resolve(baseQuery(args, api, extraOptions));
//           },
//           reject,
//         });
//       });
//     }

//     isRefreshing = true;

//     const refreshResult = await baseQuery(
//       {
//         url: "/admin/refresh-token",
//         method: "POST",
//       },
//       api,
//       extraOptions
//     );

//     if (refreshResult?.data) {
//       const newToken =
//         (refreshResult.data as any)?.token 
//         (refreshResult.data as any)?.data?.token;

//       console.log("✅ New Token:", newToken);

//       localStorage.setItem("token", newToken);

//       processQueue(null, newToken);
//       isRefreshing = false;

//       // 🔥 UPDATE HEADER
//       args.headers = {
//         ...(args.headers || {}),
//         "x-access-token": newToken,
//       };

//       return await baseQuery(args, api, extraOptions);
//     } else {
//       processQueue("Refresh failed", null);
//       isRefreshing = false;

//       localStorage.removeItem("token");

//       if (typeof window !== "undefined") {
//         window.location.href = "/signin";
//       }
//     }
//   }

//   return result;
// };