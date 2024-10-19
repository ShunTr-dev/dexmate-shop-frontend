import React from 'react';
import { Chart } from 'react-charts';

//type MyDatum = { date: Date, stars: number }

//https://react-charts.tanstack.com/docs/installation
//https://github.com/TanStack/react-charts
//  npm install react-charts@beta --save

function SellsChart(props) {
    // const data = [
    //     {
    //         data: [
    //             {
    //                 primary: '2022-02-03T00:00:00.000Z',
    //                 likes: 130,
    //             },
    //             {
    //                 primary: '2022-03-03T00:00:00.000Z',
    //                 likes: 150,
    //             },{
    //                 primary: '2022-04-03T00:00:00.000Z',
    //                 likes: 200,
    //             },
    //             {
    //                 primary: '2022-05-03T00:00:00.000Z',
    //                 likes: 250,
    //             },
    //         ],
    //     }
    // ]

    const data = [
        {
            label: props.label,
            data: props.data,
        },
    ];

    const primaryAxis = React.useMemo(
        () => ({
            getValue: (datum) => datum.monthlyStatisticsDate,
        }),
        []
    );

    const secondaryAxes = React.useMemo(
        () => [
            {
                getValue: (datum) => datum.sells,
            },
        ],
        []
    );

    return (
        <div style={{ minHeight: '300px' }}>
            <Chart
                options={{
                    data,
                    primaryAxis,
                    secondaryAxes,
                }}
            />
        </div>
    );
}

export default SellsChart;
