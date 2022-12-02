import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const covidApi = createApi({
  // Set the baseUrl for every endpoint below
  reducerPath: 'covidApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.covid19api.com/' }),
  endpoints: (builder) => ({
    getWorldTotal: builder.query({
      query: () => `world/total`,
    }),
    getSummary: builder.query({
        query: () => `summary`,
      }),
      
    getCountryDetail: builder.query({
        query: ({name,start,end}) => `country/${name}/status/confirmed?from=${start}&to=${end}`,
      }),
    getCountryList: builder.query({
        query: () => `countries`,
      }),
    updatePokemon: builder.mutation({
      query: ({ name, patch }) => ({
        url: `pokemon/${name}`,
        // When performing a mutation, you typically use a method of
        // PATCH/PUT/POST/DELETE for REST endpoints
        method: 'PATCH',
        // fetchBaseQuery automatically adds `content-type: application/json` to
        // the Headers and calls `JSON.stringify(patch)`
        body: patch,
      }),
    }),
  }),
})

export const { useGetWorldTotalQuery,useGetSummaryQuery,useLazyGetCountryDetailQuery,useGetCountryListQuery } = covidApi