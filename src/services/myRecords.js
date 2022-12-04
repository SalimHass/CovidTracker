import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const myRecordApi = createApi({
  // Set the baseUrl for every endpoint below
  reducerPath: 'myRecordApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  tagTypes: ['Request'],
  endpoints: (builder) => ({
    getMyRecords: builder.query({
      query: () => ({
        url:`api/myCovidRecord/`,
        
      }),
      providesTags: ['Request'],
    }),
    addCovidRecord: builder.mutation({
      query: (data) => ({
        url: `api/myCovidRecord/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Request'],
    }),
    deleteCovidRecord: builder.mutation({
      query: (id) => ({
        url: `api/myCovidRecord/${id}`,
        method: 'Delete',
      }),
      invalidatesTags: ['Request'],
    }),
  }),
})

export const { useGetMyRecordsQuery,useAddCovidRecordMutation,useDeleteCovidRecordMutation} = myRecordApi