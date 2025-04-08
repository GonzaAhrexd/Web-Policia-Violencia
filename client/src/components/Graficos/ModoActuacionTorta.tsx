import { Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useEffect, useState } from 'react';
function ModoActuacionTorta(data , aspect ) {
    
    const [ chartData, setChartData ] = useState<any[]>([]);
    const [ colors, setColors ] = useState<string[]>([]);

    

  
    return (

    <ResponsiveContainer width="100%" aspect={aspect || 1} >
    <PieChart width={400} height={400}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label = {({name, value}) => `${name} (${value.toFixed(2)}%)`}
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

export default ModoActuacionTorta