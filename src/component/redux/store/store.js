import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../slice/autApiSlice";
import { cmsApi } from "../slice/cmsApiSlice";
import { productApi } from "../slice/productApiSlice";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [cmsApi.reducerPath]: cmsApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      cmsApi.middleware,
      productApi.middleware
    ),
});
