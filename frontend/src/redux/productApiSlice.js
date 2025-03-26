import {
    apiSlice
} from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: ({
                token,
                keyword,
                pageNumber
            }) => ({
                url: `/products`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                params: {
                    keyword,
                    pageNumber
                }
            }),
        }),
        getProductDetail: builder.query({
            query: ({
                productId,
                token
            }) => ({
                url: `/products/${productId}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }),
        }),
        postProduct: builder.mutation({
            query: ({
                token,
                data
            }) => ({
                url: `/products`,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data
            }),
            providesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: ({
                productId,
                token,
                data
            }) => ({
                url: `/products/${productId}`,
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data
            }),
            providesTags: ['Product'],
        }),
        deleteProduct: builder.mutation({
            query: ({
                productId,
                token,
            }) => ({
                url: `/products/${productId}`,
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }),
        }),
    }),
});

export const {
    useGetProductQuery,
    useGetProductDetailQuery,
    usePostProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApiSlice;