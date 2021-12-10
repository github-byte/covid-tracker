import React,{useState,useEffect} from 'react'
import "./common.css"
import Button from "./ToggleButton/Button"
import {Card,CardContent,Typography,Link,Grid} from "@material-ui/core"
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";



function Prevention() {
   const [news, setNews] = useState([])
   const [showLoading, setShowLoading] = useState(true);
   

 
   useEffect(() => {
     const getNewsData = async () => {
       const result = await fetch('http://newsapi.org/v2/everything?q=coronavirus&from=2020-09-21&sortBy=popularity&apiKey=e3f497d14748461f9353b8a6fd22bdfd')
       .then(res=>res.json()).then((data)=> {setNews(data)});
       // console.log(result);
      //  setData(result.data.articles);
      
       setShowLoading(false);
     };
 //e3f497d14748461f9353b8a6fd22bdfd
     getNewsData();
   }, []);


const text=news['articles'];
  let array=[];
   for(let i in text){
      console.log(text[i].description)
      array.push(text[i]);
   }
console.log(array)
const responsive = {
   superLargeDesktop: {
     // the naming can be any, depends on you.
     breakpoint: { max: 4000, min: 3000 },
     items: 5
   },
   desktop: {
     breakpoint: { max: 3000, min: 1024 },
     items: 3
   },
   tablet: {
     breakpoint: { max: 1024, min: 464 },
     items: 2
   },
   mobile: {
     breakpoint: { max: 464, min: 0 },
     items: 1
   }
 };

   
   return(
          <div>
    {/* <i class="fas fa-hands-wash "></i> */}
    <div className="button">
   <Button /></div>

   <h1 className="heading">Prevention</h1>
<Card className="box">
<CardContent> 
<div className="box">
   <h2>Wash hands</h2>
   </div>
</CardContent>
</Card>


   <Card className="box">
   <CardContent>
    <h2>Wear masks</h2>
</CardContent>

   </Card>
   <Card className="box">
   <CardContent>
    <h2>Avoid Contact</h2>
</CardContent>
</Card>
<hr style={{height:"1px",border:"1px solid turquoise",marginTop:"70px",marginBottom:"30px"}}></hr>
<div style={{textAlign:"left",position:"relative"}}><h2>TOP NEWS</h2></div>

<div style={{display:"flex",width:"50px"}}>

<Carousel responsive={responsive} interval={3000} infiniteLoop={true} centerMode={true} autoPlay={true} stopOnHover={true}>

  {         array.map((e,i)=>{
            
            return(
               
<Grid  container spacing={5}>
               <Grid item xs={6} sm={3}>   
               <Card className="news">   
               <CardContent style={{display:"flex"}}>
               
            <div >
            <p style={{textAlign:"right",color:"white",fontSize:"10px"}}>Source:{e.source.name}</p>
            <div className="news-flag"style={{backgroundImage:`url(${e.urlToImage})`}}></div>
         
            <h4 style={{color:"white"}}>{e.title}</h4>
            
            <div style={{color:"turquoise",height:"170px"}} >{e.description}</div>
            <div><a href={e.url} target="_blank" rel="noopener noreferrer">Read More</a></div>
            </div>
            </CardContent>
            </Card>
            </Grid>
            </Grid>
           
            //
            );
            
            
         } )
        
      }
      </Carousel>
      
      </div>
      
     {/* <Carousel responsive={responsive}>
        <div style={{backgroundColor:"yellow"}}>item1</div>
        <div style={{backgroundColor:"white"}}>item2</div>
        <div style={{backgroundColor:"yellow"}}>item1</div>
        <div style={{backgroundColor:"white"}}>item2</div>
     </Carousel> */}
</div>




   );
}
export default Prevention
