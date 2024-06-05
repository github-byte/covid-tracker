import React from 'react'
import  "./Table.css"
import {Grid} from "@material-ui/core"
import numeral from "numeral"


function Table({countries})
{
return (
<div className="Table">
  <table>
    <tr>
    <th>Country</th>
        <th className="">Recovered</th>
        <th className="">Deaths</th>
        <th className="">Cases</th>
    </tr>
    {countries.map(({name,cases,recovered,deaths})=>(
      <tr>
      <Grid container spacing={4}>
        <Grid item xs={3}>
        <td >{name}</td>   </Grid>
        <Grid item xs={3}>
        <td className=""><strong>{numeral(recovered).format("0,0")}</strong></td></Grid>
        <Grid item xs={3}>
        <td className=""><strong>{numeral(deaths).format("0,0")}</strong></td></Grid>
        <Grid item xs={3}>
        <td className=""><strong>{numeral(cases).format("0,0")}</strong></td></Grid>
      </Grid>
      </tr>     
      )
      )
    } 
  </table>
</div>
)}


export default Table;




    
            

