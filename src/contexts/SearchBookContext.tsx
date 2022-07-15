import {createContext} from 'react';

export interface SearchBookContextType {
    search: {
        value: string,
        category: string
    };
    setSearch: ({}: any) => void
}

export const SearchBookContext = createContext<SearchBookContextType>({
    search: {
        value: "",
        category: ""
    },
    setSearch: ({}) => {
    }
})