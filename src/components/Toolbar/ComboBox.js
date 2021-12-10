        import React,{useEffect,useState} from 'react'
        import TextField from '@material-ui/core/TextField';
        import "../common.css"
        import Autocomplete from '@material-ui/lab/Autocomplete';
        import Linegraph from "../LineGraph"

        
        export default function ComboBox() {
          const [options,setOption]=useState()
          const [value,setValue]=useState([]);
          

          
            useEffect(() => {
                fetch(`https://disease.sh/v3/covid-19/countries/`)
                .then(response=>response.json())
                .then(data => {
                  setOption(data)           
                  
                });
              }, []);
            
      

            return (
              <div >
            <i class="fas fa-virus"  style={{color:'white'}}></i>
             <Autocomplete
                id="controllable-states-demo"
                value={value['country']}
                onChange={async(event,newValue)=>{await setValue(newValue)}}
                options={options}
                style={{width:"300px",marginLeft:"40%",background:'white'}}
                getOptionLabel={(options) => options.country}
                className="color"
                renderInput={(params) => <TextField {...params} label="India" variant="outlined" style={{color:"#80FFDB"}}/>}
              />

              <div><h1>{`${(value['country'] )? `${value['country']}` : 'India'}`}</h1></div>
          {value&&<Linegraph value={value} />}
            </div>
            );
          }
    
