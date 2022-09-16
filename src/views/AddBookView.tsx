import React, {FormEvent, useState} from 'react';
import {BookEntity} from 'types';
import {Spinner} from "../components/common/Spinner/Spinner";
import {DataError} from "../types/data-error";
import {ErrorPage} from "./ErrorPageView/ErrorPage";
import {Button} from "../components/common/Button";
import {apiUrl} from "../utils/api";

export const AddBookView = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | DataError>(null);
    const [info, setInfo] = useState<null | string>(null);

    const [form, setForm] = useState<BookEntity>({
        id: "",
        author: "",
        title: "",
        pages: 0,
        status: "",
    });

    const updateForm = (key: string, value: string) => {

        setForm({
            ...form,
            [key]: value,
        })
    }

    const sendForm = async (e: FormEvent) => {

        e.preventDefault();
        try {
            setLoading(true);

            const resp = await fetch(`${apiUrl}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await resp.json();

            const error: DataError = {
                code: resp.status,
                message: data.message,
            }

            if ([400, 500, 404].includes(resp.status)) {
                setError(error);
                return
            }

            setInfo(`${data.newBook.title} has been added to the library!`)

        } finally {
            setLoading(false)
        }

    }

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

            <form onSubmit={sendForm}>
                <div className="row">

                    <div className="three columns">
                        <label>Title</label>
                        <input
                            value={form.title}
                            name="title"
                            required
                            type="text"
                            onChange={e => updateForm(e.target.name, e.target.value)}
                        />
                    </div>
                    <div className="three columns">
                        <label>Author</label>
                        <input
                            value={form.author}
                            type="text"
                            required
                            name="author"
                            onChange={e => updateForm(e.target.name, e.target.value)}
                        />
                    </div>
                    <div className="three columns">
                        <label>Number of pages</label>
                        <input
                            value={form.pages}
                            min="0"
                            type="number"
                            name="pages"
                            onChange={e => updateForm(e.target.name, e.target.value)}
                        />
                    </div>
                    <div className="three columns">
                        <label>Status </label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={e => updateForm(e.target.name, e.target.value)}
                        >
                            <option value=''>- choose -</option>
                            <option value="read">Read</option>
                            <option value="not read">Not read</option>
                        </select>

                    </div>
                </div>
                <Button
                    text="add"
                    className="four columns offset-by-four button"
                    color="lightgreen"
                />

                <Button
                    to="/books"
                    color=""
                    text="Back to the main page"
                    className="button four columns offset-by-four"
                />

            </form>
        </div>
    </>
}