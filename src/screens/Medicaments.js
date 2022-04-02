import React, {useState} from "react";
import {TextField} from "@mui/material";
import MedicamentsTab from "../components/tab/MedicamentsTab";

export default function Medicaments() {
    const [searched] = useState();
    const [filter, setFilter] = useState('')

    return (
        <div>
            <TextField value={searched} onChange={(e) => {
                setFilter(e.target.value)
            }} id="outlined-basic" label="Title"
                       variant="outlined"/>
            <MedicamentsTab filter={filter} />
        </div>
    );
}