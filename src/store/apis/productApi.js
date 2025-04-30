import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => 'products',
        }),
        getProductById: builder.query({
            query: (id) => `products/${id}`,
        }),
        fetchFeaturedProducts: builder.query({
            query: () => 'products/featured',
        }),
    }),
});

export const { 
    useGetProductsQuery, 
    useGetProductByIdQuery,
    useFetchFeaturedProductsQuery
} = productApi;

export default productApi;