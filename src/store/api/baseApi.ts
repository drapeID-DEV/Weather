import { ICity } from '@/shared/types/city.type'
import { IWeatherResponse } from '@/shared/types/weatherResponse.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

const baseUrl = 'https://api.openweathermap.org/data/3.0'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCityData: builder.query<IWeatherResponse, ICity>({
            query: (city: ICity) => `/onecall?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`,
        }),
    }),
})

export const { useGetCityDataQuery } = baseApi;