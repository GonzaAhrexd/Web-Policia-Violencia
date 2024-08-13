import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

function DenunciasMunicipios({ data }: any) {
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const transformData = (data: any) => {
            const result: any[] = [];
        //     for (const region in data) {
        //         for (const city in data[region]) {
        //             result.push({ name: city, value: data[region][city] });
        //         }
        //     }
        //     return result;
        // };

        console.log(data)

        // setChartData(transformData(data));
        }
    }, []);

    return (
        <ResponsiveContainer width="100%" aspect={1}>
            <BarChart width={150} height={40} data={chartData}>
                <CartesianGrid strokeDasharray="4 1 2" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default DenunciasMunicipios;