import React from "react";
import type0 from '../../images/blood/blood-0.png'
import typeA from '../../images/blood/blood-A.png'
import typeB from '../../images/blood/blood-B.png'
import typeAB from '../../images/blood/blood-AB.png'
import typeNull from '../../images/blood/blood-neutral.png'
import '../../css/patient/BloodType.css'

export default function BloodType(props) {
    let type = typeNull;
    if(props.data.user.bloodType.name === '0'){
        type = type0;
    }
    if(props.data.user.bloodType.name === 'A'){
        type = typeA;
    }
    if(props.data.user.bloodType.name === 'B'){
        type = typeB;
    }
    if(props.data.user.bloodType.name === 'AB'){
        type = typeAB;
    }
    return (
        <img className="BloodTypeContainer" src={type} alt={type}/>
    );
}

