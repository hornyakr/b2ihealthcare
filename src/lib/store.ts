import { configureStore } from "@reduxjs/toolkit"

import searchReducer from "./features/resources/searchFormSlice"
import { snowOwlApi } from "@/services/snowOwlApi"

export const makeStore = () => {
  return configureStore({
    reducer: {
      search: searchReducer,
      [snowOwlApi.reducerPath]: snowOwlApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(snowOwlApi.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
