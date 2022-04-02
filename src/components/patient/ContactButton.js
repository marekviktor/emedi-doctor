import React from "react";
import '../../css/patient/ContactButton.css'
import chatImg from '../../images/chat.png'

export default function ContactButton() {
    return (
        <button className={'button'}>
            <img className={"chatImg"} src={chatImg} alt={chatImg}/>
            Contact
        </button>
    );
}