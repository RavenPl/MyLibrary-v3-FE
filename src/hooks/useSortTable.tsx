import React, {useState} from "react";
import {BookEntity} from "types";

interface SortConfigType {
    key: keyof (BookEntity);
    direction: string;
}

export const useSortTable = (data: BookEntity[]) => {

    const [sortConfig, setSortConfig] = useState<SortConfigType>({
        key: "title",
        direction: "ascending",
    });

    const sortedBooks = React.useMemo(() => {

        let sortedBooks = [...data];

        sortedBooks.sort((a, b) => {


                // @ts-ignore
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                // @ts-ignore
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            }
        );
        return sortedBooks;

    }, [data, sortConfig]);

    const requestSort = (key: keyof (BookEntity)) => {

        let direction = 'ascending';
        if (sortConfig !== null && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({key, direction});
    }

    return {items: sortedBooks, requestSort, sortConfig}
}