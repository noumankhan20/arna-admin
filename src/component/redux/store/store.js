import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../slice/autApiSlice";
import { cmsApi } from "../slice/cmsApiSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [cmsApi.reducerPath]: cmsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      cmsApi.middleware
    
    ),
});
