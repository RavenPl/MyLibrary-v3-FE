import React from 'react';
import './ErrorPage.css';
import {Button} from "../../components/common/Button";
import {DataError} from "../../types/data-error";

interface Props {
    error: DataError;
}

export const ErrorPage = (props: Props) => {

    return (
        <>
            <div className="error">
                <p>{props.error.message}</p>
            </div>
            {
                !["Your book list is empty!", "There is no book with this ID!"].includes(props.error.message)
                    ? <div className="row">
                        <Button
                            onClick={() => window.location.reload()}
                            className="four columns offset-by-four"
                            text="Ok"
                            color="lightgrey"
                        />
                    </div>
                    : <Button
                        to="/books"
                        color="white"
                        className="four columns offset-by-four button"
                        text="Back to the main page"
                    />
            }

        </>
    )
}