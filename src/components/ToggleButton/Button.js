import React,{useState} from "react"
import Toolbar from "../Toolbar/Toolbar"


function Button()
{
   const [state, setState] = useState(false);
 
   function click(){
       setState(!state);
   }
   return(
<div >

    <i class="fas fa-bars" onClick={click} style={{position:'absolute',top:'32px',left:'10px'}}>
        {state?<Toolbar/>:null}
    </i>
    
    </div>
   );
}

export default Button;