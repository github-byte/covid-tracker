import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Bar, Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import numeral from "numeral"
import {LAST_7_DAYS, PIE_DATA, BOOKING_DATA, LAST_MONTH} from './DATA';

function LineGraph({ value }) {
  const [set, setState] = useState()
  const [cases, setCase] = useState([]);
  const [recover, setRecover] = useState([]);
  const [deaths, setDeath] = useState([]);


  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=120`)
      .then(response => response.json())
      .then(
        (data) => {
          setState(data)
        }
      );

  }, []);

  useEffect(() => {

    const getCountries = async () => {

      await fetch("https://disease.sh/v3/covid-19/countries/356")
        .then(response => response.json())
        .then(data => {
          if (value['cases'] == undefined) {
            setCase(data.cases)
            setRecover(data.recovered)
            setDeath(data.deaths)
          }

        })
    }
    getCountries();
  }, [])


  let val = [];
  let cas = [];
  let death = [];

  for (let x in set) {
    val.push(set[x])
    cas = Object.values(val[0])
  }

  let lastdata = [];
  let chartdata = [];

  val.map((e) => {
    {
      lastdata = (Object.keys(e));
      chartdata = Object.values(e);
    }

  })
  console.log(chartdata)
  let name2 = [];
  let prev = '';
  prev = chartdata[0];

  for (let i = 1; i < chartdata.length; i++) {
    name2.push(chartdata[i] - prev)
    prev = chartdata[i];
  }

  let name0 = [];
  for (let i = 0; i < cas.length; i++) {
    name0.push(cas[i + 1] - cas[i])
  }

  let die = val[1]
  let dead = []
  for (let i in die) {
    dead.push(die[i])
  }

  let pre = dead[0]
  let finalDead = []
  for (let x = 1; x < dead.length; x++) {
    finalDead.push(dead[x] - pre);
    pre = dead[x]
  }




  const state0 = {
    labels: lastdata,
    datasets: [
      {
        label: 'cases',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#ffa500',
        borderColor: '#ffa500',
        borderWidth: 2,
        data: name0
      },
    ]
  }


  const state1 = {
    labels: lastdata,
    datasets: [
      {
        label: 'recovered',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#adff2f',
        borderColor: '#adff2f',
        borderWidth: 2,
        data: name2
      },
    ]
  }

  const state2 = {
    labels: lastdata,
    datasets: [
      {
        label: 'deaths',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        data: finalDead
      }
    ]
  }


  const newXAxis = [];
  const yAxis = []

  LAST_7_DAYS.forEach((data) => {
    let {time_bucket='', count=''} = data;
    var date = new Date(time_bucket);
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                date.getUTCDate(), date.getUTCHours(),
                date.getUTCMinutes(), date.getUTCSeconds());
    let dateString = `${new Date(now_utc)}`;
    yAxis.push(Number(count))
    newXAxis.push(dateString)
  })

  const handleDateFormat = (date, monthInAlphabets = false) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if(!date) return;
    return `${new Date(date).getDate()}/${new Date(date).getMonth()}/${new Date(date).getFullYear()}`
    
    // let dateArr = date.split('-');
    
    // let year = dateArr[0];
    // let month = dateArr[1];
    // let day = dateArr[2];
  
    
    // if(monthInAlphabets) {
    //   let monthNumber = Number(month);
    //   month = monthNames[monthNumber-1];
    // }
  
    // return [day, month, year].join('-');
  }

  const monthDataX = [];
  const monthDataY = []
  let {timeSeriesData=[], lastSearchDate:dateBefore='', totalFlightSearchCount=0} = LAST_MONTH
  timeSeriesData.forEach((data) => {
    let dateRange = ``
    let {timebucket:dateNow='', count=''} = data;
    var date = new Date(dateNow);
    var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
    date.getUTCDate());
    let dateString = `${new Date(now_utc).getDate()}/${new Date(now_utc).getMonth()}/${new Date(now_utc).getFullYear()}`;
    dateRange = `${dateBefore} - ${dateNow}` 
    dateBefore = dateNow
    monthDataY.push(Number(count))
    monthDataX.push(dateString)
  })
  console.log("my new data", monthDataX)
  const state3 = {
    labels: monthDataX,
    datasets: [
      {
        label: 'Flight search',
        fill: false,
        lineTension: 0,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        data: monthDataY
      }
    ]
  }

  const state4 = {
    labels: newXAxis,
    datasets: [
      {
        label: 'Flight search',
        fill: false,
        lineTension: 0,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        data: yAxis
      }
    ]
  }

  const {bookingsCount=[],} = BOOKING_DATA
  const pendingBookings = bookingsCount.filter((bookings) => bookings.status == 'PENDING')
  let confirmedBookings = bookingsCount.filter((bookings) => bookings.status == 'CONFIRMED')
  const confirmedBookingArray = []
  let totalConfirmed = 0
  const pendingBookingArray = []
  let totalPending = 0
  for(let i in confirmedBookings){
    confirmedBookingArray.push(confirmedBookings[i].count)
    totalConfirmed += confirmedBookings[i].count
  }
  for(let i in pendingBookings){
    pendingBookingArray.push(pendingBookings[i].count)
    totalPending += pendingBookings[i].count
  }
  console.log("booking data", state3, state4)
  
  return (
    <div >

      {/* {value['countryInfo'] ? <img src={`${value['countryInfo'].flag}`} style={{ height: '100px', width: '130px', borderRadius: ' 20px', boxShadow: '1px 0px 20px 0px #e0f43d' }} /> : <img src="https://disease.sh/assets/img/flags/in.png" style={{ height: '100px', width: '130px', borderRadius: ' 20px', boxShadow: '1px 0px 20px 0px #e0f43d' }} />} */}

      <div style={{ display: "flex" }}>

        <div style={{ width: "500px", height: "400px", marginLeft: '200px', marginTop: '141px' }}>

          <Bar
            data={{
              labels: ['Infected', 'Recovered', 'Deaths'],
              datasets: [
                {
                  label: 'People',
                  backgroundColor: ['#FFB600', '#adff2f', 'rgba(255, 0, 0, 0.5)'],
                  data: (value['cases'] ? [value['cases'], value['recovered'], value['deaths']] : [cases, recover, deaths])
                },
              ],
            }}
            options={{
              title: {
                display: true,
                text: 'Covid cases in last 120 days',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'top'
              }
            }}
          />
        </div>
        <div style={{ width: "500px", height: "400px", marginTop: '141px' }}>
          <Doughnut
            data={{
              labels: ['Infected', 'Recovered', 'Deaths'],
              datasets: [
                {
                  label: 'People',
                  backgroundColor: ['#FFB600', '#adff2f', 'rgba(255, 0, 0, 0.5)'],
                  data: (value['cases'] ? [numeral(value['cases']).format("0,0"), value['recovered'], value['deaths']] : [cases, recover, deaths])
                },
              ],
            }}
            options={{
              title: {
                display: true,
                text: 'Covid cases in last 120 days',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'top'
              }
            }}
          />
        </div>
      </div>
      <Pie
            data={{
              labels: [`${totalConfirmed} Confirmed`,`${totalPending} Pending`],
              datasets: [
                {
                  label: 'People',
                  backgroundColor: ['#FFB600', '#adff2f', 'rgba(255, 0, 0, 0.5)'],
                  data: [confirmedBookingArray,pendingBookingArray]
                },
              ],
            }}
            options={{
              title: {
                display: true,
                text: 'Confirmed',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'top'
              }
            }}
          />
      <div style={{ width: "1200px", height: "700px", marginLeft: '200px', marginRight: "200px", marginTop: '-40px', marginBottom: '200px' }}>
        <Line
          data={state3}
          options={{
            title: {
              display: true,
              text: 'Flight searches',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'top'
            },
            scales: {
              xAxes: [{
                  // title: "time",
                  // type: 'time',
                  // scaleLabel:{  
                  //   display: true,
                  // },
                  gridLines: {
                      lineWidth: 2
                  },
                  // x:{
                  //   suggestedMax:'2022-12-31T00:00:00.000Z'
                  // },
                  // time: {
                  //     unit: "month",
                  //     unitStepSize: 1,
                  //     displayFormats: {
                  //         millisecond: 'MMM DD',
                  //         second: 'MMM DD',
                  //         minute: 'MMM DD',
                  //         hour: 'MMM DD',
                  //         day: 'MMM DD',
                  //         week: 'MMM DD YYYY',
                  //         month: 'MMM DD',
                  //         quarter: 'MMM DD',
                  //         year: 'MMM DD',
                  //     }
                  // }
              }],
          }
          }}
        />
        {/* <Line
          data={state1}
          options={{
            title: {
              display: true,
              text: 'Covid cases in last 120 days',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'top'
            }
          }}
        />
        <Line
          data={state2}
          options={{
            title: {
              display: true,
              text: 'Deaths in last 120 days',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'top'
            }
          }}
        /> */}
      </div>
      <div style={{ width: "1200px", height: "700px", marginLeft: '200px', marginRight: "200px", marginTop: '-40px', marginBottom: '200px' }}>
        <Line
          data={state4}
          options={{
            title: {
              display: true,
              text: 'Flight searches Monthly',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'top'
            },
            scales: {
              xAxes: [{
                  title: "time",
                  type: 'time',
                  gridLines: {
                      lineWidth: 2
                  },
                  time: {
                      unit: "month",
                      unitStepSize: 1,
                      displayFormats: {
                          millisecond: 'MMM DD',
                          second: 'MMM DD',
                          minute: 'MMM DD',
                          hour: 'MMM DD',
                          day: 'MMM DD',
                          week: 'MMM DD',
                          month: 'MMM',
                          quarter: 'MMM DD',
                          year: 'MMM DD',
                      }
                  }
              }],
              yAxes: [{
                title: "time",
            }]
          }
          }}
        />
        {/* <Line
          data={state1}
          options={{
            title: {
              display: true,
              text: 'Covid cases in last 120 days',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'top'
            }
          }}
        />
        <Line
          data={state2}
          options={{
            title: {
              display: true,
              text: 'Deaths in last 120 days',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'top'
            }
          }}
        /> */}
      </div>
    </div>
  );
}



export default LineGraph



