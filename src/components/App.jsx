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
import Helpline from "./Helpline"
import Prevention from "./Prevention"
import  Statistics from "./Statistics"
import Map from "./Map"
import Globe from "./globe"
import "../../node_modules/leaflet/dist/leaflet.css"
import Button from "./ToggleButton/Button"
import Toolbar from "./Toolbar/Toolbar"
import Example from "./example/Example";




function Home() {
   const [countries,setCountries]=useState([])          //array of objects having all countries
  const[country,setCountry]=useState(["Worldwide"])         //array having 1 object wordwide
    const[countryInfo,setcountryInfo]=useState([])                  //array having total count of worldwide cases
    const[tabledata,setTabledata]=useState([])                      //object of array of all 
    const[mapCenter,setmapCenter]=useState({lat: 34.80746, lng: -40.4796 })
    const [mapZoom,setmapZoom]=useState(3)
    const [casesType, setCasesType] = useState("");
  const[mapCountries,setmapCountries]=useState([])
  const [clicked,setClicked]=useState(true)
  const[button,setButton]=useState(false)
  const [drawer,setDrawer]=useState(false)
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
function Red(){
    console.log("click")  
    setClicked(!clicked);
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

  return (
    <div>
  
    <div className="app">
    <div><Button/></div>
   
    <div className="app__left" >
   
    <div className="app__header">

      <h1>Covid 19 tracker</h1>
  <FormControl className="app__dropdown">
        <Select variant="outlined"  value={country} onChange={countryChange}>
       <MenuItem value="Worldwide">Worldwide</MenuItem>
       {countries.map((country)=>{return <MenuItem className="dropdown" value={country.name}>{country.name}</MenuItem>})}
       </Select>
       </FormControl>
       
       </div>
    
   <div  className="app__stats" >
   <i class="far fa-lungs-virus"></i>
                <InfoBox   isRed active={casesType==="cases"}
                title="Coronavirus cases" 
                onClick={(e)=>setCasesType("cases")}
                cases={countryInfo.todayCases}   
                 total={countryInfo.cases} />
                
                <InfoBox  active={casesType==="recovered"} 
                className={clicked?"isGreen":null} title="Recovered" 
                 onClick={(e)=>setCasesType("recovered")}
               
                cases={countryInfo.todayRecovered }       
                 total={countryInfo.recovered}    />
                
                <InfoBox  className={clicked?"isRed":null} 
                isRed active={casesType==="deaths"} 
                title="Deaths" 
                 onClick={(e)=>(setCasesType("deaths"))}
                cases={(countryInfo.todayDeaths) }               
                 total={countryInfo.deaths}      />
                 </div>
                 <Map countries={mapCountries} center={mapCenter} zoom={mapZoom}  casesType={casesType}/>             
</div>


<div className="right_div">
   <Card className="app__right">
   <CardContent>
<h3 style={{color:"#7796C2"}}>Live Cases </h3>
<i class="fas fa-angle-double-down" onClick={Yes}></i>
<Table  countries={tabledata}/>
<h3>Worldwide</h3>
   </CardContent>
   </Card>
   </div>
   </div>
   <div  className="globe">Login for</div>
</div>

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
    <Route path="/helpline" component={Helpline}/>
    </div>
    </Switch>
    </div>
    </Router>);
}
export default App;