import { type Character, type ApiResponse, type GetCharactersParams } from "../types/character";

const BASE_URL = 'https://rickandmortyapi.com/api';
export const FetchFunction = async <T>(url: string):Promise<T> => {
    try {
        const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Unknown error occurred')
    }
}

export const getCharacters = async (params : GetCharactersParams) => {

    const query = new URLSearchParams();

    const page = params.currentPage || 1;
    query.append('page', page.toString());
    if(params.deboucedName && params.deboucedName !== 'undefined') query.append('name', params.deboucedName);
    if(params.status && params.status !== 'all' && params.status !== 'undefined') query.append('status', params.status);
    if(params.species && params.species !=='all' && params.species !== 'undefined') query.append('species', params.species);
    if(params.gender && params.gender !=='all' && params.gender !== 'undefined') query.append('gender', params.gender);
    const url = `${BASE_URL}/character?${query.toString()}`;
    return FetchFunction<ApiResponse>(url);
}

export const getCharactersById = async ( id: number) => {
    const url = `${BASE_URL}/character/${id}`;

    return FetchFunction<Character>(url);
}