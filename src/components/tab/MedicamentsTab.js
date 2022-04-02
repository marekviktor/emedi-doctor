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
import {LoadingComponent} from "../LoadingComponent";
import {ErrorComponent} from "../ErrorComponent";

const GET_MEDICAMENTS = gql`
    query MyQuery($filter: MedicamentFilter, $first: Int, $after: Cursor) {
        medicaments(filter: $filter, first: $first, after: $after) {
            totalCount
            pageInfo {
                startCursor
                endCursor
            }
            nodes {
                medicamentId
                code
                packaging
                regDate
                title
            }
        }
    }
`;

export default function MedicamentsTab(props) {
    const [filter, setFilter] = useState(props.filter)

    useEffect(()=>{
        setFilter(props.filter)
    },[props.filter])


    const [first, setFirst] = useState(10)
    const [after, setAfter] = useState(null)
    const [page, setPage] = React.useState(0);

    const {loading, data, error, fetchMore} = useQuery(GET_MEDICAMENTS,{
        variables:{
            "filter": {"title": {"startsWithInsensitive": filter}},
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
            setAfter(data.medicaments.pageInfo.endCursor)
            await fetchMore({
                variables: {
                    "filter": {"title": {"startsWithInsensitive": filter}},
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

    return (
        <Paper>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">SUKL code</TableCell>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Registration date</TableCell>
                            <TableCell align="left">Packaging</TableCell>
                        </TableRow>
                    </TableHead>
                    {data != null &&
                        <TableBody>
                            {data.medicaments.nodes.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell align="left">{row.title}</TableCell>
                                    <TableCell align="left">{row.code}</TableCell>
                                    <TableCell align="left">{row.medicamentId}</TableCell>
                                    <TableCell align="left">{row.regDate}</TableCell>
                                    <TableCell align="left">{row.packaging}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    }
                </Table>
                {data != null &&
                    <TablePagination
                        component="div"
                        count={data.medicaments.totalCount}
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