import React, {useState} from 'react';
import {BooksView} from "./views/BooksView";
import {Route, Routes} from "react-router-dom";
import {EditBookView} from "./views/EditBookView/EditBookView";
import {AddBookView} from "./views/AddBookView";
import {DeleteBookView} from "./views/DeleteBookView";
import {DeleteAllBooksView} from "./views/DeleteAllBooksView";
import {NotFoundView} from "./views/NotFoundView/NotFoundView";
import {SearchBookContext} from "./contexts/SearchBookContext";

export function App() {

    const [search, setSearch] = useState({
        value: "",
        category: "title"
    });

    return (

        <SearchBookContext.Provider value={{
            search, setSearch
        }}>
            <Routes>
                <Route path="/books" element={<BooksView/>}/>
                <Route path="/books/edit/:id" element={<EditBookView/>}/>
                <Route path="/books/add" element={<AddBookView/>}/>
                <Route path="/books/delete/all" element={<DeleteAllBooksView/>}/>
                <Route path="/books/delete/:id" element={<DeleteBookView/>}/>
                <Route path="*" element={<NotFoundView/>}/>
            </Routes>
        </SearchBookContext.Provider>
    )
}

