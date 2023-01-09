import {createContext} from 'react';

interface SearchBookContextType {
    search: {
        value: string,
        category: string,
    };
    setSearch: ({}: {
        value: string;
        category: string
    }) => void
}

export const SearchBookContext = createContext<SearchBookContextType>({
    search: {
        value: "",
        category: ""
    },
    setSearch: ({}) => {
    }
})