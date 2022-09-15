import React, {useState} from "react";
import {BookEntity} from "types";

type specialEntityType = Omit<BookEntity, 'id'>

interface SortConfigType {
    key: keyof (specialEntityType);
    direction: string;
}

export const useSortTable = (data: BookEntity[]) => {

    const [sortConfig, setSortConfig] = useState<SortConfigType>({
        key: "title",
        direction: "ascending",
    });

    const sortedBooks = React.useMemo(() => {

        let sortedBooks = [...data];

        sortedBooks.sort((a: BookEntity, b: BookEntity) => {

                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }

                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            }
        );
        return sortedBooks;

    }, [data, sortConfig]);

    const requestSort = (key: keyof (specialEntityType)) => {

        let direction = 'ascending';
        if (sortConfig !== null && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({key, direction});
    }

    return {items: sortedBooks, requestSort, sortConfig}
}