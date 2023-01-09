import {createContext} from 'react';

export interface SetSearch {
    value: string;
    category: string
}

export interface SearchBookContextType {
    search: {
        value: string,
        category: string,
    };
    setSearch: ({}: SetSearch) => void
}

export const SearchBookContext = createContext<SearchBookContextType>({
    search: {
        value: "",
        category: ""
    },
    setSearch: ({}) => {
    }
})