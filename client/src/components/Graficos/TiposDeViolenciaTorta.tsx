// Hooks
import { useEffect, useState } from 'react';
// ReChart
import { Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

type DenunciasDivisionesComisariasTortaProps = {
  tipos_de_violencia: { [tipo: string]: number }
}

function TiposDeViolencia({tipos_de_violencia}: DenunciasDivisionesComisariasTortaProps) {
  
  const [chartData, setChartData] = useState<any[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  
  useEffect(() => {
    const data = Object.entries(tipos_de_violencia)
    .filter(([key]) => key !== 'Total')
    .map(([key, value]) => ({
      name: key,
      value: value,
    }));
    setChartData(data);

    
    // Generar colores dinámicos
    const dynamicColors = data.map((_, index) => `hsl(${(index * 360) / data.length}, 70%, 50%)`);
    setColors(dynamicColors);
  }, [tipos_de_violencia]);


  
  
  return (
    <ResponsiveContainer width="100%" height="100%" aspect={1} >

    <PieChart width={400} height={400}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {/* @ts-ignore */}
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
    </ResponsiveContainer>

)
}

export default TiposDeViolencia