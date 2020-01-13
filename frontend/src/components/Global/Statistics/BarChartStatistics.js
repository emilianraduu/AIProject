import React, {useState} from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'

export default function BarChartStatistics ({props}) {
  const [animations,setAnimations] = useState('')
  return (
    <>
      <ResponsiveContainer width='99%' height='99%'>
        <BarChart
          width={600}
          height={300}
          data={props}
          margin={{
            top: 10, right: 30, left: 20, bottom: 9
          }}
          isAnimationActive = {animations === true ? false : () => {setAnimations(true); return true}}
        >
          <XAxis dataKey='name' />
          <YAxis width={20} />
          <Tooltip/>
          <Bar dataKey='value' barSize={40} fill='#4a90e2' />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}