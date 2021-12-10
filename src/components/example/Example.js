import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";
  import React from "react";
import Statistics from "../Statistics"
import Prevention from "../Prevention"
import Toolbar from "../Toolbar/Toolbar"

  function Example(){
return(<Router>
    <div>
    <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/statistics" component={Statistics}/>
    <Route path="/prevention" component={Prevention}/>
    </Switch>
    </div>
    </Router>);
}
function Home(){
    return(<div><h1>My home</h1></div>);
}
export default Example;