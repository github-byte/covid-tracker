import React,{useEffect, useState} from 'react'
import Button from "./ToggleButton/Button"
import "./common.css"
import "./styles.css"
import Globe from "./MapChart"
import ComboBox from "./Toolbar/ComboBox"

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
       <ComboBox />
       {/* <div  className="globe2"><Globe/></div> */}
   </div>);
   
}
export default Statistics;



