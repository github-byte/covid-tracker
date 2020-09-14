import React from 'react'
import {Map as LeafletMap,TileLayer } from "react-leaflet"
import "./Map.css"

import {showDataOnMap} from "./utils"

function Map({center,zoom,casesType,countries}) {

    return (
        <div className="map">
           <LeafletMap center={center} zoom={zoom} style={{ backgroundColor: "#24364E"}}>
               <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
           {showDataOnMap(countries,casesType)}
       {    console.log(casesType)}
           </LeafletMap>
        </div>
    )
}

export default Map
