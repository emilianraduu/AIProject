import React from 'react'
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'

export default function PieChartStatistics({ props }) {
  // const [animations,setAnimations] = useState('')
  const RADIAN = Math.PI / 180
  const COLORS = ['#4a90e2', '#f8646b','#ffc36b','#75dd55','#6780e6','#B0B0B0']
  props.sort((a,b)=>{
    if(a.value<b.value)
      return 1;
    else return -1
  })
  let data = []
  props.map((prop,index) =>{

    if(index > 4) {

      if(!data[5]) {
        let others = {
          name:'Others',
          value:0
        }
        data.push(others)
        data[5].value+=prop.value
      }
      else {
      data[5].value+=prop.value
        }
    }
    else {
      data.push(prop)
    }
    return data
  })
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.12
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }
  return (
    <>
      <ResponsiveContainer width="99%" height="99%">
        <PieChart margin={{ left: 5 }} width={300} height={300}>
          <Pie
            legendType='circle'
            data={data}
            cx="50%"
            cy="45%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius="90%"
            innerRadius="45%"
            fill="#8884d8"
            dataKey="value"
            isAnimationActive = {false}
          >
            {
              data.map((entry, index) =>
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} name={entry.name}/>
                )
            }
          </Pie>
          <Legend verticalAlign='bottom' height={100}/>
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}