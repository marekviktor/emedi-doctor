import React, {useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

export default function Settings() {
    const{t,i18n} = useTranslation()
    const[language,setLanguage] = useState(i18n.language);


    const handleChange = (event) => {
        setLanguage(event.target.value);
    };

    return (
        <div className="Settings">
            <Typography variant="h6" noWrap component="div">
                {t('Settings')}
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 150}} variant="standard">
                <InputLabel id="set-lang-label">Language</InputLabel>
                <Select
                    labelId="set-lang-label"
                    id="set-lang-id"
                    value={language}
                    onChange={handleChange}
                    autoWidth
                    label="Language"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'en'}>English</MenuItem>
                    <MenuItem value={'sk'}>Slovenský</MenuItem>
                </Select>
            </FormControl>
            <Button onClick={()=>{i18n.changeLanguage(language).then()}} variant="outlined">{t('Select')}</Button>
        </div>
    );
}

