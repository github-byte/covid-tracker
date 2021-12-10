import React,{useState} from 'react'
import {Map as LeafletMap,TileLayer } from "react-leaflet"
import "./Map.css"
import {Circle,Popup} from "react-leaflet"
import numeral from "numeral"

import {showDataOnMap} from "./utils"

function Map({center,zoom,casesType,countries}) {
      
    return (
        <div className="map">
           <LeafletMap center={center} zoom={zoom} >
               <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
           {showDataOnMap(countries,casesType)}
           </LeafletMap>
        </div>
    )
}

export default Map
