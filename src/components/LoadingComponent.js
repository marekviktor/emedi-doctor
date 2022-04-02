import React from 'react';
import '../css/LoadingAndError.css'
export function LoadingComponent() {
    return (
        <div className="lds-ellipsis">
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    );
}