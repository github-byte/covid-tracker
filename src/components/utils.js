import React from 'react'
import {Circle,Popup} from "react-leaflet"
import numeral from "numeral"
// // export const prettyPrintStat = (stat) =>
// //   stat ? `+${Numeral(stat).format("0.0a")}` : "+0";

const casesTypeColors = {
    cases: {
      hex: "#ffb600",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 300,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 500,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 900,
    },
  };

  export const showDataOnMap= (data,casesType) =>

  data.map((country) => {
    return(<Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        color={(casesType)?casesTypeColors[casesType].hex:casesTypeColors['cases'].hex}
        fillColor={(casesType)?casesTypeColors[casesType].hex:casesTypeColors['cases'].hex}    
        fillOpacity={0.4}
        radius={
          (casesType)?  Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier:Math.sqrt(country['cases']) * casesTypeColors['cases'].multiplier
        
        }>

      
        <Popup >
          <div className="info-container">
            <div
              className="info-flag"
              style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
            <div className="info-name">{country.country}</div>
            <div className="info-confirmed">
              Cases: {numeral(country.cases).format("0,0")}
            </div>
            <div className="info-recovered">
              Recovered: {numeral(country.recovered).format("0,0")}
            </div>
            <div className="info-deaths">
              Deaths: {numeral(country.deaths).format("0,0")}
            </div>
          </div>
        </Popup>
      </Circle>)
      
      
      }
   
    )
    
// export const showDataOnMap= (data,casesType='cases') =>



// data.map((country) => (
//   <Circle
//       center={[country.countryInfo.lat, country.countryInfo.long]}
//       color={casesTypeColors['cases'].hex}
//       fillColor={casesTypeColors['cases'].hex}    
//       fillOpacity={0.4}
//       radius={
//         Math.sqrt(country["cases"]) * casesTypeColors["cases"].multiplier
//       }>
//   {console.log("functiom"+casesType)}
     
//       <Popup >
//         <div className="info-container">
//           <div
//             className="info-flag"
//             style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
//           <div className="info-name">{country.country}</div>
//           <div className="info-confirmed">
//             Cases: {numeral(country.cases).format("0,0")}
//           </div>
//           <div className="info-recovered">
//             Recovered: {numeral(country.recovered).format("0,0")}
//           </div>
//           <div className="info-deaths">
//             Deaths: {numeral(country.deaths).format("0,0")}
//           </div>
//         </div>
//       </Popup>
//     </Circle>
    

//   )
 
//   );

    

  export const sortedData=
(data)=> {
    const sortedData=[...data]

    sortedData.sort((a,b)=>a.cases<b.cases?1:-1)

return sortedData
}
  