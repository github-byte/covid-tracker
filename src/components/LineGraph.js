import React, { useState } from 'react';
import {Line} from 'react-chartjs-2';


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
    }
  ]
}


function LineGraph(){
  // const [state,setState]=useState

  return (
    <div>
      <Line
        data={state}
        options={{
          title:{
            display:true,
            text:'Average Rainfall per month',
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

// export default class App extends React.Component {
//   render() {
   
// }

