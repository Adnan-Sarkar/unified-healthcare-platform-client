import * as React from 'react';
import {pieArcLabelClasses, PieChart} from '@mui/x-charts/PieChart';
import {DefaultizedPieValueType} from "@mui/x-charts";


// @ts-ignore
export default function Pie({data}) {
    const sizing = {
        margin: { right: 5 },
        width: 200,
        height: 200,
        legend: { hidden: true },
    };
    const TOTAL = data.map((item: any) => item.value).reduce((a: number, b: number) => a + b, 0);

    const getArcLabel = (params: DefaultizedPieValueType) => {
        return `${params.value}`;
    };

    return (
        <PieChart
            series={[
                {
                    outerRadius: 80,
                    data,
                    arcLabel: getArcLabel,
                },
            ]}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fontWeight: 'bold',
                },
            }}
            width={400}
            height={200}
        />
    );
}