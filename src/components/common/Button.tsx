import React from "react";
import {Link} from "react-router-dom";

interface Props {
    to?: string;
    name?: string;
    text: string;
    color?: string;
    className: any;
    onClick?: (e: any) => void;
}

export const Button = (props: Props) => {

    return (
        props.to
            ? <Link
                to={props.to}
                onClick={props.onClick}
                className={props.className}
                style={{backgroundColor: props.color}}
            >
                {props.text}

            </Link>
            : <button

                name={props.name}
                className={props.className}
                style={{backgroundColor: props.color}}
                onClick={props.onClick}
            >
                {props.text}
            </button>
    )
}