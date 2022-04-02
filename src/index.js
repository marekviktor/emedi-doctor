import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./screens/Dashboard";
import About from "./screens/About";
import Stats from "./screens/Stats";
import Account from "./screens/Account";
import Patients from "./screens/Patients";
import Settings from "./screens/Settings";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import Medicaments from "./screens/Medicaments";
import Patient from "./screens/Patient";

const client = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    cache: new InMemoryCache()
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Sidebar/>}>
                        <Route index element={<App/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/stats" element={<Stats/>}/>
                        <Route path="/account" element={<Account/>}/>
                        <Route path="/patients" element={<Patients/>}/>
                        <Route path="/medicaments" element={<Medicaments/>}/>
                        <Route path="/patient/:id" element={<Patient/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
