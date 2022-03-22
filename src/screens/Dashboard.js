import React from "react";
import {Typography} from "@mui/material";
import BarChart from "../charts/BarChart";
import {useTranslation} from "react-i18next";

export default function Dashboard() {
    const {t} = useTranslation()
    return (
        <div className="Dashboard">
            <Typography variant="h6" noWrap component="div">
                {t('Dashboard')}
            </Typography>
            <BarChart/>
        </div>
    );
}
