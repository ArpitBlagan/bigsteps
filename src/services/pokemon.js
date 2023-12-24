import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const pokemonApi=createApi({
    reducerPath:'pokemon',
    baseQuery:fetchBaseQuery({baseUrl:'https://pokeapi.co/api/v2/'}),
    endpoints(builder){
        return {
            getAll:builder.query({
                query:(limit)=>{
                    return {
                        url:`pokemon-species?limit=${limit}`
                    }
                },
            }),
            getByType:builder.query({
                query:(id)=>{
                    return {
                        url:`/type/${id}`
                    }
                },
            }),
            getByName:builder.query({
                query:(val)=>{
                    return {
                        url:`/pokemon/${val}`
                    }
                },
            }),
            getInofId:builder.query({
                query:(id)=>{
                    return {
                        url:`/pokemon/${id}/`
                    }
                },
            }),
        }
    }
});
export const {useGetAllQuery,useGetByNameQuery,useGetByTypeQuery,useGetInofIdQuery}=pokemonApi;