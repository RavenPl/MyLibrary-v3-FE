import React from 'react';
import {SingleBookRow} from "../SingleBookView/SingleBookRow";
import {BookEntity} from 'types';
import {useSortTable} from "../../../hooks/useSortTable";
import {Button} from "../../common/Button";
import './BooksTable.css'

interface Props {
    data: BookEntity[]
}

export const BooksTable = ({data}: Props) => {


    const {items, requestSort, sortConfig} = useSortTable(data);

    const getClassNamesFor = (name: string) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
        <>
            <table className="u-full-width">
                <thead>
                <tr>
                    <th>
                        <Button
                            className={getClassNamesFor("title")}
                            name="title"
                            text="Title"
                            onClick={(e) => requestSort(e.target.name)}/>

                    </th>
                    <th>
                        <Button
                            className={getClassNamesFor("author")}
                            name="author"
                            text="Author"
                            onClick={(e) => requestSort(e.target.name)}/>
                    </th>
                    <th>
                        <Button
                            className={getClassNamesFor("pages")}
                            name="pages"
                            text="Pages"
                            onClick={(e) => requestSort(e.target.name)}/>
                    </th>
                    <th>
                        <Button
                            className={getClassNamesFor("status")}
                            name="status"
                            text="Status"
                            onClick={(e) => requestSort(e.target.name)}/>
                    </th>
                    <th>
                        <Button
                            color="white"
                            className="button"
                            name="edit"
                            text="Edit"
                        />
                    </th>
                    <th>
                        <Button
                            color="white"
                            className="button"
                            name="action"
                            text="Action"
                        />
                    </th>
                </tr>
                </thead>
                <tbody id="table">
                {
                    items.map(book => (
                        <SingleBookRow
                            book={book}
                            key={book.id}
                        />
                    ))
                }
                </tbody>
            </table>
        </>
    )
}