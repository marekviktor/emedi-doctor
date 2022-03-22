import React from "react";
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

export default function About() {
    const{t} = useTranslation()
    return (
        <div className="About">
            <Typography variant="h6" noWrap component="div">
                {t('About')}
            </Typography>
        </div>
    );
}

