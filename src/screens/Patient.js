import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";
import BasicInfo from "../components/patient/BasicInfo";
import ContactButton from "../components/patient/ContactButton";
import '../css/patient/Patient.css'
import LineChart from "../charts/LineChart";
import BloodType from "../components/patient/bloodType";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {LoadingComponent} from "../components/LoadingComponent";

const GET_PATIENT = gql`
    query MyQuery($userId: Int!) {
        user(userId: $userId) {
            birthdate
            bloodType {
                name
            }
            rhD
            email
            foreName
            surName
            identNumber
            insuranceNumber
            lastLogin
            phone
            registeredAt
            verified
            bloodCountUsers {
                nodes {
                    bloodCount {
                        acronym
                        title
                        valueId
                    }
                }
            }
        }
    }
`;

export default function Patient() {
    const {id} = useParams()
    const [selectedBloodCountId,setSelectedBloodCountId] = useState(1);

    const {loading, data, error} = useQuery(GET_PATIENT,{
        variables:{
            "userId": parseInt(id),
        }});


    if(loading){
        return <LoadingComponent/>
    }

    if(error){
        return <p>{error.message}</p>
    }
    return (
        <div className={'patientContainer'}>
            <BasicInfo data={data}/>
            <ContactButton/>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">BloodCount Value</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedBloodCountId}
                    label="Age"
                    onChange={(event) => {
                        setSelectedBloodCountId(event.target.value);
                    }}
                >
                    {data.user.bloodCountUsers.nodes.map((row,key) => (
                        <MenuItem key={key} value={row.bloodCount.valueId}>{row.bloodCount.acronym+' | '+row.bloodCount.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <LineChart bloodCountId={selectedBloodCountId} userid={id}/>
            <BloodType data={data}/>
        </div>
    );
}