import React, { useEffect,useState } from 'react';
import {Line} from 'react-chartjs-2';
import  {value} from "./Toolbar/ComboBox";

const state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'cases',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(250,250,250,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    },
    {
      label: 'recovered',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(250,250,250,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    },
    {
      label: 'deaths',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(250,250,250,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}


function LineGraph({value}){
  const [set,setState]=useState()

  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=120`)
    .then(response=>response.json())
    .then(   
      data=>setState(data));

  }, []);

console.log({value});


const dates=()=>{
  let chartData=[];
  let lastdata;
  for(let date in set){
    if(lastdata){
      chartData.push(set[date])
    }

  }
  console.log(chartData);
}
dates();
  return (
    <div>
      <Line
        data={state}
        options={{
          title:{
            display:true,
            text:'Covid cases in last 120 days',
            fontSize:20
          },
          legend:{
            display:true,
            position:'top'
          }
        }}
      />
    </div>
  );
}



export default LineGraph



