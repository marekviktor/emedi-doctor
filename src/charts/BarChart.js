import React from "react";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import { Bar } from 'react-chartjs-2';
import faker from '@faker-js/faker';
import {useTranslation} from "react-i18next";

export default function BarChart() {

    const{t,i18n} = useTranslation()

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: t('Blood cells'),
            },
        },
    };

    const labels = [t('January'), t('February'), t('March'), t('April'), t('May'),t('June'),t('July'),t('August'),t('September'),t('October'),t('November'),t('December')]

    const data = {
        labels,
        datasets: [
            {
                label: t('White blood cells'),
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label:t('Red blood cells'),
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return (
        <div className="BarChart">
            <Bar options={options} data={data} />
        </div>
    );
}

