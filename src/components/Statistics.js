import React,{useEffect, useState} from 'react'
import Button from "./ToggleButton/Button"
import "./common.css"
import "./styles.css"
import Globe from "./MapChart"
import ComboBox from "./ComboBox"

import Linegraph from "./LineGraph"

function Statistics() {
    const[country,setCountry]=useState();
    const[countryInfo,setcountryInfo]=useState();  
    
    const change=async(event)=>{
        const countryCode=event.target.value;
        const url=
        (countryCode==='Worldwide'?"https://disease.sh/v3/covid-19/all":`https://disease.sh/v3/covid-19/countries/${countryCode}`)
        
        await fetch(url).then(response=>response.json()).then(data=>{setcountryInfo(data);
            setCountry(countryCode);
        });
    
      
    }
    console.log(country);
   return(<div style={{height:"8000px"}}>
   <div className="button">
   <Button/>
   </div>

       <h1 className="heading">Statistics</h1>
       <h2>Enter Country</h2>
       <ComboBox   />
       {/* <p style={{color:"white"}}>{country}</p> */}
       {/* <img src={countryInfo} alt="Map"/> */}
       
       <div style={{height:"500px",width:"500px"}}>  <Linegraph/></div>
       <div  className="globe2"><Globe/></div>
   </div>);
   
}
export default Statistics;
 //search
   //dropdown
       //country name country flag
       //dotted graph
       //pie MapChart
       //bar graph


