import React from "react";
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

export default function Account() {
    const{t} = useTranslation()
    return (
        <div className="Account">
            <Typography variant="h6" noWrap component="div">
                {t('Account')}
            </Typography>
        </div>
    );
}

