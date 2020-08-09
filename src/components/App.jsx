import React, { useState,useEffect } from "react";
import "./styles.css";
import {MenuItem,Select,FormControl,Grid,Card,CardContent} from "@material-ui/core"
import Table from "./Table"
import InfoBox from "./InfoBox"
import {sortedData} from "./Sort"
import {decData} from "./decData"
import LineGraph from "./LineGraph"
import numeral from "numeral";
import Map from "./Map"
import "../../node_modules/leaflet/dist/leaflet.css"

function App() {
   const [countries,setCountries]=useState([])          //array of objects having all countries
  const[country,setCountry]=useState(["Worldwide"])         //array having 1 object wordwide
    const[countryInfo,setcountryInfo]=useState([])                  //array having total count of worldwide cases
    const[tabledata,setTabledata]=useState([])                      //object of array of all 
    

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
            cases:country.cases
          }));
          const sortData=sortedData(countries)
          setTabledata(sortData)
        
          setCountries(countries);
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
        setCountry(countryCode)});


  }

  return (
      <div className="app__header" >

      <Grid container spacing={3}>

      <Grid  item xs={8}>
      <div className="app__left">
    <div className="App">
      <h1>Covid 19 tracker</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined"  value={country} onChange={countryChange}>
       <MenuItem value="Worldwide">Worldwide</MenuItem>
       {countries.map((country)=>{return <MenuItem value={country.name}>{country.name}</MenuItem>})}
       </Select>
       </FormControl>
       </div>
   <div  className="app__stats" >
                <InfoBox title="Coronavirus cases" 
                cases={countryInfo.todayCases}   
                 total={countryInfo.cases}         />
                
                <InfoBox title="Recovered" 
                cases={countryInfo.todayRecovered }       
                 total={countryInfo.recovered}    />
                
                <InfoBox title="Deaths" 
                cases={countryInfo.todayDeaths}                 
                 total={countryInfo.deaths}      />
</div>
<Map/>
   </div>
   </Grid>
   <Grid item xs={4}>
   <Card classname="app__right">
   <CardContent>
<h3>Live Cases     <button className="app__button" >^</button></h3>
<Table countries={tabledata} />
<h3>Worldwide</h3>

<LineGraph  />
   </CardContent>
   </Card>
   </Grid>
   </Grid>
   
   </div>
  );
}

export default App;