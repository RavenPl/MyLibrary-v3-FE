import React, {useState} from 'react';
import {Button} from "../components/common/Button";
import {Spinner} from "../components/common/Spinner/Spinner";
import {DataError} from "../types/data-error";
import {ErrorPage} from "./ErrorPageView/ErrorPage";
import {apiUrl} from "../utils/api";


export const DeleteAllBooksView = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [info, setInfo] = useState<string | null>(null);
    const [error, setError] = useState<null | DataError>(null);

    const deleteAll = async () => {

        try {
            setLoading(true);
            const resp = await fetch(`${apiUrl}/delete/all`, {
                method: "DELETE",
            })
            const data = await resp.json();

            if ([400, 500, 404].includes(resp.status)) {

                const error: DataError = {
                    code: resp.status,
                    message: data.message,
                }
                setError(error);
                return
            }
            setInfo("All your books have been deleted!")
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner/>
    }

    if (error) {
        return <ErrorPage error={error}/>
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

    return <>
        <div className="container">
            <h2>Do you really want to delete all your books?</h2>
            <Button
                className="button four columns offset-by-two"
                text="yes"
                color="#ee2e31"
                onClick={deleteAll}
            />
            <Button
                className="button four columns"
                text="no"
                to="/books"
                color="#7cc6fe"
            />
        </div>
    </>
}