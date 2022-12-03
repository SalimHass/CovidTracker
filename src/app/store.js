import { configureStore } from '@reduxjs/toolkit'
import { covidApi } from '../services/covidRecords'
import { myRecordApi } from '../services/myRecords'


export const store = configureStore({
  reducer: {
    
    [covidApi.reducerPath]: covidApi.reducer,
    [myRecordApi.reducerPath]: myRecordApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(covidApi.middleware).concat(myRecordApi.middleware),
})

