import React , {Component }from "react"
import './App.css';
import LineChart from "./components/LineChart"
import MyRadarComp from "./components/RadarChart"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
 
    <div className="App container-fluid">
       <MyRadarComp />
    
       <hr style={{ borderTop: "2px solid rgba(0, 0, 0, 0.1)"}}/>
     <LineChart />
    
      
    </div>
   
  );
}

export default App;
