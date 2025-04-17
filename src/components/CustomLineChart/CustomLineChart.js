import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Grid({data}) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <LineChart
    xAxis={[{ scaleType: 'band', data: monthNames }]} // Use all months
    series={Object.keys(data).map(scheme => ({
      id: `scheme-${scheme}`,
      label: `Scheme ${scheme}`,
      data: data[scheme].map(d => d.y),
    }))}
    
    height={300}
  />
  );}
