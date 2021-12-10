import React, { useEffect,useState } from 'react';
import {Line} from 'react-chartjs-2';
import numeral from "numeral"


function Graph({value}){
  const [set,setState]=useState()


  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=120`)
    .then(response=>response.json())
    .then(   
      (data)=>{setState(data)
    }
      );

  }, []);



let val=[];
let cas=[];

for(let x in set){
val.push(set[x])
cas=Object.values(val[0])
}




let lastdata=[];
let chartdata=[];

val.map((e)=>{
  {
lastdata=(Object.keys(e));
chartdata=numeral(Object.values(e)).format("0,0");
  }

})
console.log(chartdata)
let name2=[];
let prev='';
prev=chartdata[0];
for(let i=1;i<chartdata.length;i++){
name2.push(chartdata[i]-prev)
prev=chartdata[i];
}

let name0=[];
for(let i=0;i<cas.length;i++){
name0.push(cas[i+1]-cas[i])
}


const state0= {
 labels: lastdata,
  datasets: [
    {
      label: 'cases',
      fill: false,
      lineTension: 0.5,
      backgroundColor: '#ffa500',
      borderColor: '#ffa500',
      borderWidth: 2,
      data:name0
    },
      {
        label: 'recovered',
        fill: false,
        lineTension: 0.5,
        backgroundColor:  '#adff2f',
        borderColor: '#adff2f',
        borderWidth: 2,
        data: name2
      },
    
  ]
}



function setter(value){
    if(value>=1000000){

    }
    else if(value>=1000){
        let i=0;
        while(i<=4){
            value=value/10;
            i++;
        }
        return value;
    }
    else{
        return value;
    }
}

console.log(setter(23000));

  return (
    <div >

      <div >
      <Line
        data={state0}
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
    </div>
  );
}



export default Graph



