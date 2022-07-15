import React, {useContext, useEffect, useState} from 'react';
import {BooksTable} from "../BookTable/BooksTable";
import {ErrorPage} from "../../../views/ErrorPageView/ErrorPage";
import {Spinner} from "../../common/Spinner/Spinner";
import {DataError} from "../../../types/data-error";
import {SearchBookContext} from "../../../contexts/SearchBookContext";

import {BookEntity} from 'types';

import './BooksList.css'

export const BooksList = () => {

    const context = useContext(SearchBookContext);
    const {search} = context;

    const [booksList, setBooksList] = useState<BookEntity[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | DataError>(null);


    const books = async () => {

        try {

            setLoading(true);
            const resp = await fetch(`http://localhost:3001/books/?search=${search.value}&category=${search.category}`);
            const data = await resp.json();

            if ([400, 500].includes(resp.status)) {
                const error: DataError = {
                    code: resp.status,
                    message: data.message,
                }
                setError(error);
                return
            }
            setBooksList(data.booksList);

        } finally {

            setLoading(false)
        }
    }

    useEffect(() => {

        books();
    }, [search]);

    if (error) {
        return <ErrorPage error={error}/>
    }

    if (loading) {
        return <Spinner/>
    }

    return <>
        <h1>Welcome in your library</h1>
        {
            (booksList !== null && booksList.length !== 0)
                ? <h3 style={{textAlign: "center"}}>You actually have {booksList.length} books in your database.</h3>
                : <h3 style={{textAlign: "center"}}>Your library is empty!</h3>
        }

        {booksList && <BooksTable data={booksList}/>}
    </>

}