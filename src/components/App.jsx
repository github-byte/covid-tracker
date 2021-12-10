import React, { useState,useEffect } from "react";
import "./styles.css";
import {MenuItem,Select,FormControl,Grid,Card,CardContent} from "@material-ui/core"
import Table from "./Table"
import InfoBox from "./InfoBox"
import {sortedData} from "./utils"
import {decData} from "./decData"
import LineGraph from "./LineGraph"
import "./InfoBox.css"
// import numeral from "numeral";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Prevention from "./Prevention"
import  Statistics from "./Statistics"
import Map from "./Map"
import Globe from "./globe"
import "../../node_modules/leaflet/dist/leaflet.css"
import Button from "./ToggleButton/Button"
import Toolbar from "./Toolbar/Toolbar"
import { lightThemeApp,darkThemeApp } from "./style";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Graph from './Graph'
import { faCoffee, faVirus,faLungsVirus, faSpinner, faSkullCrossbones, faWalking } from '@fortawesome/free-solid-svg-icons'

export const ThemeContext=React.createContext();



function Home() {
   const [countries,setCountries]=useState([])          //array of objects having all countries
  const[country,setCountry]=useState(["Worldwide"])         //array having 1 object wordwide
    const[countryInfo,setcountryInfo]=useState([])                  //array having total count of worldwide cases
    const[tabledata,setTabledata]=useState([])                      //object of array of all 
    const[mapCenter,setmapCenter]=useState({lat: 34.80746, lng: -40.4796 })
    const [mapZoom,setmapZoom]=useState(2)
    const [casesType, setCasesType] = useState("");
  const[mapCountries,setmapCountries]=useState([])
  const [clicked,setClicked]=useState(true)
  const[button,setButton]=useState(false)


  const [ans,setTheme]=useState(true)



useEffect(()=>
     {fetch("https://disease.sh/v3/covid-19/all").then(response=>response.json())
     .then(data=>setcountryInfo(data))} ,[])




  useEffect(()=>{

    const getCountries=async()=>
    {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then(response=>response.json())
      .then(data=>
        {
          const countries=data.map((country)=>({
            name:country.country,
            value:country.countryInfo.iso2,
            cases:country.cases,
            recovered:country.recovered,
            deaths:country.deaths
          }));
         
          setmapCountries(data)
        
          setCountries(countries);
          const sortData=sortedData(countries)
      setTabledata(sortData)
  
        const decreaseData=decData(countries)
      
      })
      
    }
    getCountries();
  },[]);
  


   const countryChange=async(event)=>
  {
    const countryCode=event.target.value
  
   const url=
   (countryCode==='Worldwide'?"https://disease.sh/v3/covid-19/all":`https://disease.sh/v3/covid-19/countries/${countryCode}`)

    await fetch(url).then(response=>response.json()).then(data=>{setcountryInfo(data);
        setCountry(countryCode)
      setmapCenter([data.countryInfo.lat,data.countryInfo.long])
      setmapZoom(4)
      
    });

  }

    

function Yes(){
  setButton(!button)
  if (button===true)
  {
  setTabledata(decData)
  }
  else
  setTabledata(sortedData)
}

    function toggleBut(){
      setTheme(prevVal=>!prevVal)
    }

         

  return (
      <ThemeContext.Provider value={ans}>
    <div>
    <div className="header">
    <h1>C<span className="virus" style={{transform:'rotate(10)'}}><FontAwesomeIcon icon={faVirus} ></FontAwesomeIcon></span>VID 19</h1>
  
    </div>
    <div className="app" style={ans?lightThemeApp:darkThemeApp}>
    {/* <button onClick={toggleBut} style={{position:'absolute',display:'block'}}>Button</button> */}
    <div><Button/></div>

    <div className="app__left" >
   
    <div className="app__header">

  <FormControl className="app__dropdown">
        <Select variant="outlined"  value={country} onChange={countryChange}>
       <MenuItem value="Worldwide">Worldwide</MenuItem>
       {countries.map((country)=>{return <MenuItem className="dropdown" value={country.name}>{country.name}</MenuItem>})}
       </Select>
       </FormControl>
       
       </div>
    
   <div  className="app__stats" >
                <InfoBox   isRed active={casesType==="cases"}
                title="Coronavirus cases" 
                onClick={(e)=>setCasesType("cases")}
                icon={faLungsVirus}
                cases={countryInfo.todayCases}   
                 total={countryInfo.cases} />
                
                <InfoBox  active={casesType==="recovered"} 
                className={clicked?"isGreen":null} title="Recovered" 
                 onClick={(e)=>setCasesType("recovered")}
               icon={faWalking}
                cases={countryInfo.todayRecovered }       
                 total={countryInfo.recovered}    />
                
                <InfoBox  className={clicked?"isRed":null} 
                isRed active={casesType==="deaths"} 
                title="Deaths" 
                 onClick={(e)=>(setCasesType("deaths"))}
                 icon={faSkullCrossbones}
                cases={(countryInfo.todayDeaths) }               
                 total={countryInfo.deaths}      />
                 </div>
                 <Map countries={mapCountries} center={mapCenter} zoom={mapZoom}  casesType={casesType}/>             
</div>


<div className="right_div">
   <Card className="app__right">
   <CardContent>
<h3 style={{color:"#7796C2"}}>Live Cases </h3>
<i class="fas fa-angle-double-down" onClick={Yes} ></i>
<Table  countries={tabledata}/>
<h3>Worldwide</h3>
   </CardContent>
   </Card>
    <Graph></Graph>
    <a href="./statistics">More</a>
   </div>
   </div>
</div>
</ThemeContext.Provider>

  );
  

}
function App(){
  return(<Router>
    <div>
    <Switch>
    <div>
    <Route path="/" exact component={Home}/>
    <Route path="/statistics" component={Statistics}/>
    <Route path="/prevention" component={Prevention}/>
    </div>
    </Switch>
    </div>
    </Router>);
}
export default App;