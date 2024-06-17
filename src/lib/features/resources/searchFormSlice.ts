import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../store"
import { Item } from "@/components/resources/GetResource"

// Define a type for the slice state
interface SearchState {
  form: {
    search: string
    limit: number
  }
  result: string | undefined
}

// Define the initial state using that type
const initialState: SearchState = {
  form: {
    search: "",
    limit: 10,
  },
  result: undefined,
}

export const searchSlice = createSlice({
  name: "search",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.form.search = action.payload
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.form.limit = action.payload
    },
    changeResult: (state, action: PayloadAction<string|undefined>) => {
      state.result = action.payload
    },
  },
})

export const { setSearchTerm, setLimit, changeResult } = searchSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSearch = (state: RootState) => state.search

export default searchSlice.reducer
