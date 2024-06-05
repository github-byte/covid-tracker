import React,{useEffect, useState} from "react"
import ReactTooltip from "react-tooltip";
import "./styles.css"
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

function Globe() {
  const [data, setData] = useState([]);
  const [content, setTooltipContent] = useState(``)

  const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const colorScale = scaleLinear()
    .domain([0,120])
    .range(["#7796C2", "#24364E"]);

    useEffect(() => {
      fetch(`https://disease.sh/v3/covid-19/countries`)
      .then(response=>response.json())
      .then(data => {
        setData(data);
      });
  }, []);


  const rounded = num => {
    if (num > 1000000000) {
      return Math.round(num / 100000000) / 10 + "Bn";
    } else if (num > 1000000) {
      return Math.round(num / 100000) / 10 + "M";
    } else {
      return Math.round(num / 100) / 10 + "K";
    }
  };


  return (
    <>
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}   data-tip="" >
    
      <Sphere stroke="#80ffdb" strokeWidth={0.5} />
      <Graticule stroke="#80ffdb" strokeWidth={0.5} />
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo,index) => {
              const d = data.find(s => s.countryInfo.iso3 === geo.properties.ISO_A3);
                
              return (
                <Geography
                  key={geo.rsmKey+index}
                  geography={geo}
                  fill={d ? colorScale(d["cases"]/1000) : "#F5F4F6"}
                  onMouseEnter={() => {
                    console.log('my ara',d);
                    setTooltipContent(`${d ? d.country : 'Data not present'} ${"Cases : "}  ${rounded(d ? d.cases : '')}`)}}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                 style={{    
                  hover: {
                  fill: "#80ffdb",
                  outline: "none"
                },
                pressed: {
                  fill: "#E42",
                  outline: "none"
                }}}
                />
                
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
    {content && <ReactTooltip multiline={true} html={true}>{content}</ReactTooltip>}
    </>
  );
};

export default Globe;