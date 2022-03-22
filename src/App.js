import './App.css';
import React, {useEffect, useState} from "react";
import {Button, TextField, Typography} from "@mui/material";
import {io} from "socket.io-client";

export default function App() {

    const [user, setUser] = useState("marek");
    const [socket, setSocket] = useState(null);
    const [text,setText] = useState('');

    useEffect(()=>{
        setSocket(io('http://localhost:80'));
    },[])

    useEffect(() => {
        console.log(socket)
        socket?.emit("newUser", user);
    }, [socket, user]);

    useEffect(() => {
        socket?.on("getText", (data) => {
            console.log(data);
        });
    }, [socket]);

    const handleNotification = () => {
        socket?.emit("sendText", {
            senderName: user,
            receiverName: "jozef",
            text,
        });
    };

    return (
        <div>
            <Typography variant="h6" noWrap component="div">
                App
            </Typography>

            <TextField
                value={text}
                onChange={(event)=>{setText(event.target.value)}}
                hiddenLabel
                id="filled-hidden-label-normal"
                variant="filled"
            />

            <Button onClick={()=>handleNotification('V piatok 28.7.')}>Send notification</Button>
            
        </div>
    );
}
