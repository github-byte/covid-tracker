import React from 'react'
import "./common.css"
import Button from "./ToggleButton/Button"
import {Card,CardContent,Typography} from "@material-ui/core"
function Prevention() {
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
   <div className="last">
............................................
   </div>
    </div>
   );
}
export default Prevention
