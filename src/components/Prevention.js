import React,{useState,useEffect} from 'react'
import "./common.css"
import './styles.css'
import Button from "./ToggleButton/Button"
import {Card,CardContent,Typography,Link,Grid, Box, Divider, Paper} from "@material-ui/core"
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faVirus,faLungsVirus, faSpinner, faSkullCrossbones, faWalking,faHandsWash } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'react-bootstrap'

function Prevention() {
   const [news, setNews] = useState([])
   const [showLoading, setShowLoading] = useState(true);
   
 
   useEffect(() => {
     const getNewsData = async () => {
       const result = await fetch('https://newsapi.org/v2/everything?q=coronavirus&from=2022-1-09&to=2022-1-09&sortBy=popularity&apiKey=036b5c682fa541cda71d3da5c0bb198e')
       .then(res=>res.json()).then((data)=> {setNews(data)});
       // console.log(result);
      //  setData(result.data.articles);
      
       setShowLoading(false);
     };

     getNewsData();
   }, []);

   console.log(news);
   const text=news['articles'];
   let array=[];
   for(let i in text){
      console.log(text[i].description)
      array.push(text[i]);
   }
   console.log(array)

   var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
 const NewsComponent = ({item}) => {
    let {source={}, urlToImage='', description='', url='', title=''} = item
    return (
       <Card className={news}>
       <div >
          <p style={{textAlign:"right",color:"white",fontSize:"10px"}}>Source:{source.name}</p>
          <div className="news-flag" style={{backgroundImage:`url(${urlToImage})`}}></div>
          <h4 style={{color:"white"}}>{title}</h4>
          <div style={{color:"turquoise",height:"170px"}} >{description}</div>
          <div>
             <a href={url} target="_blank" rel="noopener noreferrer">Read More</a>
          </div>
       </div>
    </Card>);

 }
   
   return(
   <div>
      <div className="header">
         <h1>C<span className="virus" style={{transform:'rotate(10)'}}><FontAwesomeIcon icon={faVirus} ></FontAwesomeIcon></span>VID 19</h1>
      </div>
      <h1 className="heading">Prevention</h1>
      <div className="button">
      <Button/>
      </div>
      <Card className="box" style={{boxShadow:'-3px -3px 20px 11px teal'}}>
      <CardContent> 
      <div className="box">
         <h2>Wash hands</h2>
         </div>
      </CardContent>
      </Card>

      <Card className="box" style={{boxShadow:'-3px -3px 20px 11px teal'}}>
         <CardContent>
            <h2>Wear masks</h2>
         </CardContent>
      </Card>

      <Card className="box" style={{boxShadow:'-3px -3px 20px 11px teal'}}> 
         <CardContent>
            <h2>Avoid Contact</h2>
         </CardContent>
      </Card>
   {/* <hr style={{height:"1px",border:"1px dotted turquoise",marginTop:"70px",marginBottom:"30px"}}></hr> */}
   <Box>
   <div style={{textAlign:"left",position:"relative"}}><h2>TOP NEWS</h2></div>
         <Carousel responsive={settings.responsive} centerMode={true} stopOnHover={true}>
            {array.map((e,i)=>{
               return( 
               <Box width={'80%'}> 
               <p style={{textAlign:"right",color:"white",fontSize:"10px"}}>Source:{e.source.name}</p>
                <div className="news-flag" style={{backgroundImage:`url(${e.urlToImage})`}}></div>
                <h4 style={{color:"white", marginTop:'20px'}}>{e.title}</h4>
                <span style={{color:"turquoise"}} >{e.description}</span>
               <div>
                  <a href={e.url} target="_blank" rel="noopener noreferrer">Read More</a>
               </div>
               </Box> 
               );    
            })
            }
         </Carousel>
   </Box>
   </div>
   );
}
export default Prevention
