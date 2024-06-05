import React,{useState} from 'react'
import {Card,CardContent,Typography} from "@material-ui/core"
import "./InfoBox.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faVirus,faLungsVirus, faSpinner } from '@fortawesome/free-solid-svg-icons'
import numeral from "numeral"


function InfoBox({title,cases,icon,total,active,isRed,...props})
 
{
    return (
        <Card style={{width:'20%'}}
        onClick={props.onClick}
        className={`infoBox ${active && "infoBox--selected"} ${ isRed && "infoBox--red"}`} >
        <CardContent>
           <FontAwesomeIcon icon={icon} style={{fontSize:'3rem',color:"#80ffdb"}}></FontAwesomeIcon>
          <Typography color="textSecondary" gutterBottom style={{color:"#80ffdb"}}>
            {title}
          </Typography>
          <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
            {cases}
          </h2>
          <Typography className="infoBox__total" color="#80ffdb">
            {numeral(total).format("0,0")} Total
          </Typography>
        </CardContent>
      </Card>
    );
  }


export default InfoBox;
