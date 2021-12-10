import React, { useEffect,useState } from 'react';
import {Line} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import  {value} from "./Toolbar/ComboBox";
import { Doughnut } from 'react-chartjs-2';

function LineGraph({value}){
  const [set,setState]=useState()
  const [cases,setCase]=useState([]);
  const [recover,setRecover]=useState([]);
  const [deaths,setDeath]=useState([]);


  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=120`)
    .then(response=>response.json())
    .then(   
      (data)=>{setState(data)
    }
      );

  }, []);
  useEffect(()=>{

    const getCountries=async()=>
    {

      await fetch("https://disease.sh/v3/covid-19/countries/356")
      .then(response=>response.json())
      .then(data=>
        {
         if(value['cases']==undefined){
           setCase(data.cases)
           setRecover(data.recovered)
          setDeath(data.deaths)
         }

        })
      }
      getCountries();
    },[])


let val=[];
let cas=[];
let death=[];

for(let x in set){
val.push(set[x])
cas=Object.values(val[0])
}




let lastdata=[];
let chartdata=[];

val.map((e)=>{
  {
lastdata=(Object.keys(e));
chartdata=Object.values(e);
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

let die=val[1]
let dead=[]
for(let i in die){
  dead.push(die[i])
}

let pre=dead[0]
let finalDead=[]
for(let x=1;x<dead.length;x++){
finalDead.push(dead[x]-pre);
pre=dead[x]
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
  ]
}


const state1= {
  labels: lastdata,
   datasets: [
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




const state2= {
  labels: lastdata,
   datasets: [
     {
       label: 'deaths',
       fill: false,
       lineTension: 0.5,
       backgroundColor: 'rgba(75,192,192,1)',
       borderColor: 'rgba(75,192,192,1)',
       borderWidth: 2,
       data:finalDead
     }
   ]
 }




  return (
    <div >
    
    {value['countryInfo']? <img src={`${value['countryInfo'].flag}`} style={{ height: '100px', width: '130px',borderRadius:' 20px',boxShadow: '1px 0px 20px 0px #e0f43d'}}/>:<img src="https://disease.sh/assets/img/flags/in.png" style={{ height: '100px', width: '130px',borderRadius:' 20px',boxShadow: '1px 0px 20px 0px #e0f43d'}}/>}
     
    <div style={{display:"flex"}}>
   
    <div style={{width:"500px",height:"400px",marginLeft: '200px',marginTop: '141px'}}>
   
   <Bar
         data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['#FFB600', '#adff2f', 'rgba(255, 0, 0, 0.5)'],
              data:(value['cases']?[value['cases'],value['recovered'],value['deaths']]:[cases,recover,deaths])
            },
          ],
        }}
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
      <div style={{width:"500px",height:"400px",marginTop: '141px'}}>
       <Doughnut
         data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['#FFB600', '#adff2f', 'rgba(255, 0, 0, 0.5)'],
              data:(value['cases']?[value['cases'],value['recovered'],value['deaths']]:[cases,recover,deaths])
            },
          ],
        }}
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
      <div style={{width:"900px",height:"700px",marginLeft: '200px',marginRight:"200px",marginTop:'-40px',marginBottom:'200px'}}>
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
            <Line
        data={state1}
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
       <Line
        data={state2}
        options={{
          title:{
            display:true,
            text:'Deaths in last 120 days',
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



export default LineGraph



