import React,{useEffect,useState} from 'react'
        import TextField from '@material-ui/core/TextField';
        import "../common.css"
        import Autocomplete from '@material-ui/lab/Autocomplete';
        import {Select} from "@material-ui/core"
        import Linegraph from "../LineGraph"
        
        export default function ComboBox() {
          const [options,setOption]=useState()
          const [value,setValue]=useState(['Worldwide']);
            useEffect(() => {
                fetch(`https://disease.sh/v3/covid-19/countries`)
                .then(response=>response.json())
                .then(data => {
                  setOption(data)
                     data.map(()=>({
                      country:data.country,
                      flag:data.flag
                      
                  }))
                });
              }, []);


  {console.log(options)}
             console.log(value['country'])
            return (
              <div>
            <div>{`Country: ${value['country'] !== null ? `${value['country']}` : 'Worldwide'}`}</div>
           
            {/* <div style={{ backgroundImage: `url(${value['countryInfo.flag']})`,width:"200px" }}  >k</div> */}
            {/* {console.log({value.countryInfo.flag})} */}
              <Autocomplete
                id="controllable-states-demo"
                value={value['country']}
                onChange={(event,newValue)=>{setValue(newValue); }}
                options={options}
                style={{width:300}}
                getOptionLabel={(options) => options.country}
                className="color"
                renderInput={(params) => <TextField {...params} label="Worldwide" variant="outlined"/>}
              />
           <Linegraph value={value}/>
            </div>
            );
          }
    
