import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = "http://localhost:3000/api/store";

export const apiSlice: any = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: builder => ({
        getCategories: builder.query({
            query: () => '/categories'
        }),
        getCategory: builder.query({
            query: categoryId => `/categories/${categoryId}`
        })
    })
})

export const { useGetCategoriesQuery, useGetCategoryQuery } = apiSlice
