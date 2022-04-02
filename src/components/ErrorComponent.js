import React from 'react';
import '../css/LoadingAndError.css'

export function ErrorComponent(props) {
    return (
        <h4 className={"errorMessage"}>{props.error.message}</h4>
    );
}