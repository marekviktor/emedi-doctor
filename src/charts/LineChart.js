import React from "react";
import {Chart} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import '../css/patient/LineChart.css'
import {gql, useQuery} from "@apollo/client";
import {LoadingComponent} from "../components/LoadingComponent";
import {ErrorComponent} from "../components/ErrorComponent";

const GET_BLOOD_COUNT = gql`
    query MyQuery2($bloodCountId: Int!, $userId: Int!) {
        bloodCountUsers(condition: {bloodCountId: $bloodCountId, userId: $userId}) {
            nodes {
                bloodCountId
                bloodCount {
                    acronym
                    description
                    source
                    title
                    units
                    men {
                        end {
                            value
                        }
                        start {
                            value
                        }
                    }
                    women {
                        end {
                            value
                        }
                        start {
                            value
                        }
                    }
                }
                bloodCountUserValues(orderBy: CREATED_AT_ASC) {
                    nodes {
                        bloodCountValue
                        createdAt
                        description
                        meeting {
                            admin {
                                firstName
                                lastName
                            }
                        }
                    }
                }
            }
        }
    }
`;
export default function LineChart(props) {

    const {loading, data, error} = useQuery(GET_BLOOD_COUNT, {
        variables: {
            "userId": parseInt(props.userid),
            "bloodCountId": parseInt(props.bloodCountId)
        }
    });


    if (loading) {
        return (
            <div className={'chartContainer'}>
                <LoadingComponent/>
            </div>
        );
    }

    if (error) {
        return (
            <div className={'chartContainer'}>
                <ErrorComponent error={error}/>
            </div>
        );
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )
    // console.log(data)
    const dates = [];
    const values = [];

    console.log(data.bloodCountUsers.nodes[0].bloodCountUserValues.nodes.length)

    for (let i = 0; i < data.bloodCountUsers.nodes[0].bloodCountUserValues.nodes.length; i++) {
        dates.push(data.bloodCountUsers.nodes[0].bloodCountUserValues.nodes[i].createdAt)
        values.push(data.bloodCountUsers.nodes[0].bloodCountUserValues.nodes[i].bloodCountValue)
    }

    console.log(dates, values)
    const state = {
        labels: dates,
        datasets: [
            {
                label: data.bloodCountUsers.nodes[0].bloodCount.acronym,
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: values,
            }
        ]
    }
    return (
        <div className={'chartContainer'}>
            <Chart
                type={'line'}
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'Average Rainfall per month',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    },
                }}
            />
        </div>
    );
}