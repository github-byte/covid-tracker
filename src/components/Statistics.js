import React,{useEffect, useState} from 'react'
import Button from "./ToggleButton/Button"
import "./common.css"
import "./styles.css"
import Globe from "./globe"
import { Box } from '@material-ui/core'
import ComboBox from "./Toolbar/ComboBox"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faVirus} from '@fortawesome/free-solid-svg-icons'

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
    return(<div>
        <div className="button">
            <Button/>
        </div>
        <div className="header">
         <h1>C<span className="virus" style={{transform:'rotate(10)'}}><FontAwesomeIcon icon={faVirus} ></FontAwesomeIcon></span>VID 19</h1>
        </div>
        <h1 className="heading">Statistics</h1>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} mb={3}>
                <ComboBox />
            </Box>
                <Globe/>
    </div>);
   
}
export default Statistics;



