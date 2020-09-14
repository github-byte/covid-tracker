import React,{useEffect,useState} from 'react'
        import TextField from '@material-ui/core/TextField';
        import "./common.css"
        import Autocomplete from '@material-ui/lab/Autocomplete';
        import {Select} from "@material-ui/core"
        
        
        export default function ComboBox() {
          const [data,setData]=useState()
          const [value,setValue]=useState(['Worldwide']);
            useEffect(() => {
                fetch(`https://disease.sh/v3/covid-19/countries`)
                .then(response=>response.json())
                .then(data => {
                  setData(data)
                     data.map(()=>({
                      country:data.country,
                      flag:data.flag
                  }))
                });
              }, []);


              
  //  const countryChange=async(event)=>
  //  {
  //    const countryCode=event.target.renderInput
    
  //   const url=
  //   (countryCode==='Worldwide'?"https://disease.sh/v3/covid-19/all":`https://disease.sh/v3/covid-19/countries/${countryCode}`)
 
  //    await fetch(url).then(response=>response.json()).then(data=>{
  //        setCountry(countryCode) 
  //    });
  //   }

             console.log(value['country'])
            return (
              <div>
            <div>{`value: ${value !== null ? `${value}` : null}`}</div>
            <div style={{ backgroundImage: `url(${value['countryInfo.flag']})` }}></div>
              <Autocomplete
                id="combo-box-demo"
                value={value}
                onChange={(event,newValue)=>{setValue(newValue)}}
                options={data}
                getOptionLabel={(options) => options.country}
                
                style={{ width: 300 }}
                className="color"
                renderInput={(params) => <TextField {...params} label="Worldwide" variant="outlined"/>}
              />
           
            </div>
            );
          }
    
          // setcountryInfo(data);