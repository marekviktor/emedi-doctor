import React, {useEffect, useState} from 'react'
import {TablePagination} from "@mui/material";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import {gql, useQuery} from "@apollo/client";
import vszp from "../../images/vszp.png"
import union from "../../images/union.png"
import dovera from "../../images/dovera.png"
import {useNavigate} from "react-router-dom";
import {LoadingComponent} from "../LoadingComponent";
import {ErrorComponent} from "../ErrorComponent";

const GET_PATIENTS = gql`
    query MyQuery($after: Cursor, $filter: UserFilter, $first: Int) {
        users(after: $after, filter: $filter, first: $first) {
            totalCount
            pageInfo {
                startCursor
                endCursor
            }
            nodes {
                userId
                verified
                surName
                insuranceCompanyId
                foreName
                email
                birthdate
            }
        }
    }
`;

export default function PatientsTab(props) {
    const [filter, setFilter] = useState(props.filter)

    useEffect(()=>{
        setFilter(props.filter)
    },[props.filter])
    const [first, setFirst] = useState(10)
    const [after, setAfter] = useState(null)
    const [page, setPage] = React.useState(0);
    const navigate = useNavigate();
    const {loading, data, error, fetchMore} = useQuery(GET_PATIENTS,{
        variables:{
            "filter": {"surName": {"startsWithInsensitive": filter}},
            "first": first,
            "after": after
        }});


    if(loading){
        return <LoadingComponent/>
    }

    if(error){
        return <ErrorComponent error={error}/>
    }

    async function handleChangePage (event, newPage) {
        console.log(page<newPage);
        if(page<newPage){
            setAfter(data.users.pageInfo.endCursor)
            await fetchMore({
                variables: {
                    "filter": {"surName": {"startsWithInsensitive": filter}},
                    "first": first,
                    "after": after
                },
            });
            console.log(data)
        }
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setFirst(parseInt(event.target.value, 10));
        setPage(0);
    };

    function handleClick(id) {
        navigate(`/patient/${id}`);
    }

    return (
        <Paper>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell variant={"head"} align="left">ForeName</TableCell>
                            <TableCell variant={"head"} align="left">SurName</TableCell>
                            <TableCell variant={"head"} align="left">Birth year</TableCell>
                            <TableCell variant={"head"} align="left">Email</TableCell>
                            <TableCell variant={"head"} align="left">Insurance</TableCell>
                        </TableRow>
                    </TableHead>
                    {data != null &&
                        <TableBody>
                            {data.users.nodes.map((row) => (
                                <TableRow onClick={()=>handleClick(row.userId)} key={row.foreName}>
                                    <TableCell variant={"body"} align="left">{row.foreName}</TableCell>
                                    <TableCell variant={"body"} align="left">{row.surName}</TableCell>
                                    <TableCell variant={"body"} align="left">{new Date(row.birthdate).getFullYear()}</TableCell>
                                    <TableCell variant={"body"} align="left">{row.email?row.email:"Email is missing!"}</TableCell>
                                    {row.insuranceCompanyId === 25 && <img src={vszp} height={60} alt={"vszp"}/>}
                                    {row.insuranceCompanyId === 24 && <img src={dovera} height={60} alt={"dovera"}/>}
                                    {row.insuranceCompanyId === 27 && <img src={union} height={60} alt={"union"}/>}
                                </TableRow>
                            ))}
                        </TableBody>
                    }
                </Table>
                {data != null &&
                    <TablePagination
                        component="div"
                        count={data.users.totalCount}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={first}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                }
            </TableContainer>
        </Paper>
    );
}