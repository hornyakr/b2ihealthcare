import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const API_KEY = process.env.NEXT_PUBLIC_SNOW_OWL_API_KEY

interface Qeury {
  title?: string
  limit?: number
}

export const snowOwlApi = createApi({
  reducerPath: "snowOwlApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.snowray.app/snowowl/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${API_KEY}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    getResources: builder.query({
      query: ({ title, limit = 50 }: Qeury) => {
        const params = new URLSearchParams()

        if (title && title.trim() !== "") params.append("title", title)
        params.append("limit", limit.toString())

        return `resources?${params.toString()}`
      },
    }),
  }),
})

export const { useGetResourcesQuery } = snowOwlApi
