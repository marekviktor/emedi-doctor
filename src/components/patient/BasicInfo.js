import React from "react";
import '../../css/patient/BasicInfo.css'
import beard from '../../images/beard.png'
export default function BasicInfo(props) {
    return (
        <div className={'container'}>
            <img className={'avatar'} src={beard} alt={beard}/>
            <h1 className={"surName"}>{props.data.user.surName}</h1>
            <p className={"forName"}>{props.data.user.foreName}</p>
            <p className={"year"}>{new Date(props.data.user.birthdate).getFullYear()}</p>
        </div>
    );
}


