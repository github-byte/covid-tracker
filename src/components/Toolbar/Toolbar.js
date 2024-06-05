import React,{useState} from 'react'
import {Link} from "react-router-dom"
import './Toolbar.css'

export default function Toolbar () {
  return(
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div className="toolbar__logo">
      <Link to="/">
        <a href="/" >Covid 19</a>
        </Link>
      </div>
      <div className="spacer" >
      <div className="toolbar_navigation-items">
        <ul>
        <Link to="/Statistics"><li>
            Statistics
          </li>
          </Link>
          <Link to="/Prevention">
          <li>
            Prevention
          </li>
          </Link>
        </ul>
      </div>
      </div>
    </nav>
  </header>);

  
}


 