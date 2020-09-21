import React,{useState,useEffect} from 'react'
import "./common.css"
import Button from "./ToggleButton/Button"
import {Card,CardContent,Typography,Link,Grid} from "@material-ui/core"
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
  let img=[];
  let heading=[]
   for(let i in text){
      console.log(text[i].description)
      array.push(text[i]);
   // array.push(text[i].description);
   // img.push(text[i].urlToImage);
   // heading.push(text[i].title);
   }
console.log(array);


function Heading(){

  
}





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
<div>NEWS</div>
<div style={{backgroundImage:`url${img}`,height:'120px'}}>nnn</div>
{/* <img src=`${img}` alt="img"/> */}

{/* <div>{array} <br/> </div> */}
{/* {
   heading.map((e)=>{
      return(<Card style={{width:"200px",height:"500px",textAlign:"center",float:"center"}}>
      <CardContent>{e}
     
      
      </CardContent>
      </Card>)
      })
     
} */}

{
         array.map((e)=>{
            
            return(
               
               <Grid container spacing={5}>
               <Grid item xs={3}>
               <Card className="news">
               <CardContent style={{display:"flex"}}>
               
            <div >
            <div className="news-flag"style={{backgroundImage:`url(${e.urlToImage})`}}></div>
            
            <h2 style={{color:"white"}}>{e.title}</h2>
            
            <div style={{color:"turquoise"}}>{e.description}</div>
            <div><Link href="#">More</Link></div>
            </div>
            </CardContent>
            </Card>
            </Grid>
            </Grid>);
         })
      }



{/* {
   img.map((e)=>{
         return(<div style={{backgroundImage: `${e}`,width:"200px",height:"200px"}}>
         <img src=`${e}`/>
         </div>);
      })
} */}
{/* <heading/>
<pic/>
<description/> */}


</div>


   );
}
export default Prevention
