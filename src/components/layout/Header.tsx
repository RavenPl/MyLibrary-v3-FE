import React, {FormEvent, useContext, useState} from 'react';
import './Header.css';
import {Button} from "../common/Button";
import {SearchBookContext} from "../../contexts/SearchBookContext";

export const Header = () => {

    const {search, setSearch} = useContext(SearchBookContext);

    const [data, setData] = useState({
        value: search.value,
        category: search.category,
    })

    const updateData = (key: string, value: string) => {

        setData({
            ...data,
            [key]: value
        })
    };

    const setSearchValue = (e: FormEvent) => {
        e.preventDefault()

        setSearch(data)
    }

    return (
        <>
            <header>

                <div className='row'>
                    <Button to="/books/add" color="#d0f4de" text="add a book" className='button three columns'/>
                    <Button to="/books/delete/all"
                            text='Clear list'
                            color='#ff99c8'
                            className='two columns button'
                    />
                    <form
                        onSubmit={setSearchValue}>

                        <input
                            className="three columns button"
                            name="value"
                            value={data.value}
                            placeholder="write searching"
                            type="text"
                            style={{marginLeft: "4%"}}
                            onChange={e => updateData(e.target.name, e.target.value)}
                        />
                        <label
                            style={{
                                lineHeight: "38px",
                                textAlign: "right",
                                fontSize: "14px"
                            }}
                            className="two columns"
                        >SEARCH BY:
                        </label>
                        <select
                            className="two columns u-pull-right"
                            name="category"
                            value={data.category}
                            onChange={e => updateData(e.target.name, e.target.value)}
                        >
                            <option value="title">TITLE</option>
                            <option value="author">AUTHOR</option>
                        </select>

                        <Button
                            className="offset-by-five seven columns button"
                            text="Search"
                            color="#a9def9"
                        />
                    </form>
                </div>

            </header>
        </>
    )
}