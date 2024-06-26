import React, {useState} from "react";
import {TextField} from "@mui/material";
import PatientsTab from "../components/tab/PatientsTab";

export default function Patients() {
    const [searched] = useState();
    const [filter, setFilter] = useState('')

    return (
        <div>
            <TextField value={searched} onChange={(e) => {
                setFilter(e.target.value)
            }} id="outlined-basic" label="SurName"
                       variant="outlined"/>
            <PatientsTab filter={filter} />
        </div>
    );
}