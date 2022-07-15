import React from 'react';
import {BookEntity} from 'types';
import {Button} from "../../common/Button";

interface Props {
    book: BookEntity,
}

export const SingleBookRow = (props: Props) => {

    return (
        <>
            <tr>
                <td>{props.book.title}</td>
                <td>{props.book.author}</td>
                <td>{props.book.pages}</td>
                <td>{props.book.status}</td>
                <td>
                    <Button
                        className="button button-edit"
                        to={`/books/edit/${props.book.id}`}
                        text="edit"
                        color="#fcf6bd"
                    />
                </td>
                <td>
                    <Button
                        to={`/books/delete/${props.book.id}`}
                        className=" button delete"
                        text="delete"
                        color="#ff99c8"
                    />
                </td>
            </tr>

        </>
    )
}