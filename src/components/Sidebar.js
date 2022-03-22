import React, {useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import '../css/Sidebar.css'

import {
    Avatar,
    Box, Collapse,
    CssBaseline,
    Drawer, IconButton,
    List,
    ListItem, ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar, Typography
} from "@mui/material";

import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';

import {ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";
import {useTranslation} from "react-i18next";

export default function Sidebar() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const drawerWidth = 240;
    const [open,setOpen] = useState(false);
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"

            >
                <Toolbar style={{backgroundColor: '#EBEAEA'}}>
                    <IconButton  onClick={()=>{navigate('/about')}}>
                        <Typography variant="h6" noWrap component="div">
                            MEDMARA s.r.o
                        </Typography>
                    </IconButton>
                </Toolbar>
                <List>
                    <ListItem style={{backgroundColor: '#DD61A7'}} onClick={() => {
                        navigate('/dashboard')
                    }} button key={'Dashboard'}>
                        <ListItemIcon>
                            <DashboardRoundedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={t('Dashboard')}/>
                    </ListItem>
                    <ListItem style={{backgroundColor: '#DD61A7'}} onClick={() => {
                        navigate('/stats')
                    }} button key={'Stats'}>
                        <ListItemIcon>
                            <QueryStatsRoundedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={t('Stats')}/>
                    </ListItem>
                    <ListItem style={{backgroundColor: '#DD61A7'}} onClick={() => {
                        navigate('/patients')
                    }} button key={'Patients'}>
                        <ListItemIcon>
                            <PeopleAltRoundedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={t('Patients')}/>
                    </ListItem>
                    <ListItemButton style={{backgroundColor: '#DD61A7'}} onClick={()=>{setOpen(!open)}}>
                        <ListItemIcon>
                            <PeopleAltRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={t("Patients")} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary={t('Starred')} />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
                <List>
                    <ListItem style={{backgroundColor: '#EEB0D3'}} onClick={() => {
                        navigate('/settings')
                    }} button key={'Settings'}>
                        <ListItemIcon>
                            <SettingsApplicationsRoundedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={t('Settings')}/>
                    </ListItem>
                    <ListItem style={{backgroundColor: '#EEB0D3'}} onClick={() => {
                        navigate('/about')
                    }} button key={'About'}>
                        <ListItemIcon>
                            <InfoRoundedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={t('About')}/>
                    </ListItem>
                </List>
                <List style={{marginTop: `auto`, backgroundColor: '#EBEAEA'}}>
                    <ListItem onClick={() => {
                        navigate('/about')
                    }} button>
                        <ListItemIcon>
                            <LogoutRoundedIcon/>
                        </ListItemIcon>
                        <ListItemText primary={t('Log out')}/>
                    </ListItem>

                </List>
            </Drawer>
            <Box
                component="main"
                sx={{flexGrow: 1, bgcolor: 'background.default', p: 3}}
            >
                <Outlet/>
                <div id={'avatar'}>
                    <IconButton  onClick={()=>{navigate('/account')}}>
                        <Avatar>MV</Avatar>
                    </IconButton>
                </div>
            </Box>
        </Box>
    );
}