import React from 'react';
import {BooksList} from "../components/Books/BookList/BooksList";
import {Header} from "../components/layout/Header";

export const BooksView = () => {

    return (
        <>
            <div className='container'>
                <Header/>
                <BooksList/>
            </div>
        </>
    )
}