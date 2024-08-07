import { cantidadDenuncias } from '../../api/crud';
import { BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { useEffect, useState } from 'react';

function DenunciasMes() {
    const [denuncias, setDenuncias] = useState(Array(12).fill(0)); // Array de 12 meses inicializados en 0
    const currentYear = new Date().getFullYear(); // Obtener el año actual

    useEffect(() => {
        const fetchDenuncias = async () => {
            const promises = [];
            const meses = [
                { mes: 'Enero', desde: `${currentYear}-01-01`, hasta: `${currentYear}-01-31` },
                { mes: 'Febrero', desde: `${currentYear}-02-01`, hasta: `${currentYear}-02-28` },
                { mes: 'Marzo', desde: `${currentYear}-03-01`, hasta: `${currentYear}-03-31` },
                { mes: 'Abril', desde: `${currentYear}-04-01`, hasta: `${currentYear}-04-30` },
                { mes: 'Mayo', desde: `${currentYear}-05-01`, hasta: `${currentYear}-05-31` },
                { mes: 'Junio', desde: `${currentYear}-06-01`, hasta: `${currentYear}-06-30` },
                { mes: 'Julio', desde: `${currentYear}-07-01`, hasta: `${currentYear}-07-31` },
                { mes: 'Agosto', desde: `${currentYear}-08-01`, hasta: `${currentYear}-08-31` },
                { mes: 'Septiembre', desde: `${currentYear}-09-01`, hasta: `${currentYear}-09-30` },
                { mes: 'Octubre', desde: `${currentYear}-10-01`, hasta: `${currentYear}-10-31` },
                { mes: 'Noviembre', desde: `${currentYear}-11-01`, hasta: `${currentYear}-11-30` },
                { mes: 'Diciembre', desde: `${currentYear}-12-01`, hasta: `${currentYear}-12-31` },
            ];

            for (let i = 0; i < meses.length; i++) {
                const { desde, hasta } = meses[i];
                promises.push(cantidadDenuncias({ desde, hasta }));
            }

            try {
                const responses = await Promise.all(promises);
                setDenuncias(responses);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDenuncias();
    }, [currentYear]);

    const data = [
        { name: "Enero", total: denuncias[0] },
        { name: "Febrero", total: denuncias[1] },
        { name: "Marzo", total: denuncias[2] },
        { name: "Abril", total: denuncias[3] },
        { name: "Mayo", total: denuncias[4] },
        { name: "Junio", total: denuncias[5] },
        { name: "Julio", total: denuncias[6] },
        { name: "Agosto", total: denuncias[7] },
        { name: "Septiembre", total: denuncias[8] },
        { name: "Octubre", total: denuncias[9] },
        { name: "Noviembre", total: denuncias[10] },
        { name: "Diciembre", total: denuncias[11] },
    ];

    return (
        <ResponsiveContainer width="100%" aspect={1}>
            <BarChart width={150} height={40} data={data}>
                <CartesianGrid strokeDasharray="4 1 2" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#6b48ff"  />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default DenunciasMes;
