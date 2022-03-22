import React, {useEffect, useState} from "react";
import {Button, TextField, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import { gql, useQuery } from '@apollo/client';

const GET_PATIENTS = gql`
  query MyQuery($filter: MedicamentFilter!) {
  allMedicaments(filter: $filter) {
    totalCount
    nodes {
      medicamentId
      title
    }
  }
  }
`;

function useUserFilters() {
    const [filters, _updateFilter] = useState({
        filter: {title:{startsWithInsensitive:undefined}}
    });

    const updateFilter = (filterType, value) => {
        _updateFilter({
            filter:{[filterType]:{startsWithInsensitive: value}},
        });
    };

    return {
        models: { filters },
        operations: { updateFilter },
    };
}

export default function Patients() {
    const { operations, models } = useUserFilters();
    const {id} = useParams();
    const {loading, error, data,refetch} = useQuery(GET_PATIENTS);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="PatientsSearch">
            <div>
                <label>Search</label>
                <input
                    onChange={(e) => {console.log(e.target.value); operations.updateFilter("title", e.target.value)}}
                />
            </div>
            <button
                onClick={() =>{
                    refetch({
                        filter: {title: {startsWithInsensitive: models.filters.filter.title.startsWithInsensitive}},
                    }).then(response => console.log(response));
                    }
                }
            >
                Submit!
            </button>
        </div>
    );
}

