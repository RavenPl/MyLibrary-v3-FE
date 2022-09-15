import React, {FormEvent, useEffect, useState} from 'react';
import {BookEntity} from 'types';
import {useParams} from "react-router-dom";
import {Button} from "../../components/common/Button";
import {Spinner} from "../../components/common/Spinner/Spinner";
import {DataError} from "../../types/data-error";
import {ErrorPage} from "../ErrorPageView/ErrorPage";

import './EditBookView.css'

export const EditBookView = () => {

    const [form, setForm] = useState<BookEntity>({
        id: "",
        author: "",
        title: "",
        pages: 0,
        status: "",
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [info, setInfo] = useState<null | string>(null);
    const [error, setError] = useState<null | DataError>(null);

    const {id} = useParams();

    useEffect(() => {

        (async () => {

            setLoading(true)

            try {
                const resp = await fetch(`http://localhost:3001/books/${id}`);
                const data = await resp.json();

                if ([400, 404, 500].includes(resp.status)) {
                    const error: DataError = {
                        code: resp.status,
                        message: data.message,
                    }
                    setError(error);
                    return
                }

                const {title, status, pages, author} = (data.book) as BookEntity

                setForm(form => ({
                    ...form,
                    title, status, pages, author,
                }))

            } finally {
                setLoading(false)
            }
        })();

    }, [])

    const sendForm = async (e: FormEvent) => {

        e.preventDefault();
        try {
            const resp = await fetch(`http://localhost:3001/books/${id}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            const data = await resp.json();

            const error: DataError = {
                code: resp.status,
                message: data.message,
            }

            if ([400, 500].includes(resp.status)) {
                setError(error);
                return
            }

            setInfo(`${data.title} has been edited!`)

        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <Spinner/>
    }

    if (error) {
        return (
            <ErrorPage error={error}/>
        )
    }

    if (info !== null) {
        return (
            <div className="container">
                <h2>{info}</h2>
                <Button
                    to="/books"
                    color=""
                    text="Back to the main page"
                    className="button four columns offset-by-four"
                />
            </div>
        )
    }

    const updateForm = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value
        }))
    }

    return (
        <>
            <div className="container">
                <h1>Edit your book</h1>

                <form onSubmit={sendForm}>
                    <div className="row">
                        <div className="three columns">
                            <label>Title</label>
                            <input
                                name="title"
                                value={form.title}
                                required
                                type="text"
                                onChange={e => updateForm(e.target.name, e.target.value)}
                            />
                        </div>
                        <div className="three columns">
                            <label>Author</label>
                            <input
                                type="text"
                                name="author"
                                value={form.author}
                                onChange={e => updateForm(e.target.name, e.target.value)}
                            />
                        </div>
                        <div className="three columns">
                            <label>Number of pages</label>
                            <input
                                min="0"
                                type="number"
                                value={form.pages}
                                name="pages"
                                onChange={e => updateForm(e.target.name, e.target.value)}
                            />
                        </div>
                        <div className="three columns">
                            <label>Status </label>
                            <select
                                value={form.status}
                                name="status"
                                onChange={e => updateForm(e.target.name, e.target.value)}
                            >
                                <option value="read">Read</option>
                                <option value="not read">Not read</option>
                            </select>
                        </div>
                    </div>
                    <Button
                        text="save"
                        className="button four columns offset-by-four"
                        color="lightgreen"
                    />
                </form>
                <Button
                    to="/books"
                    color=""
                    text="Back to the main page"
                    className="button four columns offset-by-four"/>
            </div>
        </>
    )
}