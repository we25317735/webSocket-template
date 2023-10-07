import React, { Component } from 'react'
import "./style.css"
import List from './Components/List';
import Warp from "./Components/Warp"


const App = () => {

  return (
    <div className='d-md-flex'>
    
        <List/>
     
       
       <Warp/>

    </div>
  )

}


export default App;
