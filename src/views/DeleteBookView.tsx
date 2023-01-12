import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {DataError} from "../types/data-error";
import {BookEntity} from 'types';
import {Button} from "../components/common/Button";
import {Spinner} from "../components/common/Spinner/Spinner";
import {ErrorPage} from "./ErrorPageView/ErrorPage";
import {apiUrl} from "../utils/api";

export const DeleteBookView = () => {

    const [book, setBook] = useState<BookEntity | null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [info, setInfo] = useState<string | null>(null);
    const [error, setError] = useState<null | DataError>(null);

    const {id} = useParams();

    useEffect(() => {
        try {

            (async () => {
                setLoading(true)
                const resp = await fetch(`${apiUrl}/${id}`);
                const data = await resp.json();

                if ([400, 500, 404].includes(resp.status)) {

                    const error: DataError = {
                        code: resp.status,
                        message: data.message,
                    }
                    setError(error);
                    return
                }
                const {book} = data;
                setBook(book as BookEntity);

            })()
        } finally {
            setLoading(false)
        }

    }, [])

    const deleteBook = async () => {

        try {
            setLoading(true);
            const resp = await fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
            })
            const data = await resp.json();
            const {book} = data;

            if ([400, 500, 404].includes(resp.status)) {

                const error: DataError = {
                    code: resp.status,
                    message: data.message,
                }
                setError(error);
                return
            }

            setInfo(`${book.title} has been successfully deleted from your library!`)

        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Spinner/>
    }

    if (info !== null) {
        return <div className='container'>
            <h2>{info}</h2>
            <Button
                to="/books"
                color=""
                text="Back to the main page"
                className="button four columns offset-by-four"
            />
        </div>
    }

    if (error) {
        return <ErrorPage error={error}/>
    }

    return (
        <>
            {book && <div className="container">
                <h2>Do you really want to delete {book.title}?</h2>
                <Button
                    className="button four columns offset-by-two"
                    text="yes"
                    color="#e5383b"
                    onClick={deleteBook}
                />
                <Button
                    className="button four columns"
                    text="no"
                    to="/books"
                    color="#7cc6fe"
                />
            </div>}
        </>
    )
}