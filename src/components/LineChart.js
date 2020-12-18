import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import dataJson from "../data/data.json";
import "./LineChart.css";
const { playerx } = dataJson[0];
const { playery } = dataJson[1];
const LineChart = () => {
  const [compare, setCompare] = useState(false);
  const [player, setPlayer] = useState(playerx);
  const [selectedPlayer , setSelectedPlayer] = useState("")
  const [comparedPlayer, setComparedPlayer] = useState(playery);

  const clickHandler = () => {
    setCompare(!compare);
  };

  const changeHandler =(e)=>{
    setSelectedPlayer(e.target.value)
    // e.target.value==="Player X" ? (setPlayer(playerx) && setComparedPlayer(playery)):(setPlayer(playery) && setComparedPlayer(playerx))
    if(e.target.value==="Player X"){
      setPlayer(playerx)
      setComparedPlayer(playery)
    }
    else if (e.target.value==="Player Y"){
      setPlayer(playery)
      setComparedPlayer(playerx)
    }
  }

  let label1;
  // player === playerx ? (label1 = "Player X") : (label1 = "Player Y");
  if(player === playerx){
    label1 = "Player X"
  }
  else if (player === playery){
    label1 = "Player Y"
  }
  else {
    label1 = ""
  }

  let label2;
  // comparedPlayer === playerx ? (label2 = "Player X") : (label2 = "Player Y");
  if(comparedPlayer === playerx){
    label2 = "Player X"
  }
  else if (comparedPlayer === playery){
    label2 = "Player Y"
  }
  else {
    label2 = ""
  }
  const playerAttack = player.map((c) => {
    return c.Attacking;
  });

  const comparedPlayerAttack = comparedPlayer.map((c) => {
    return c.Attacking;
  });

  const months = player.map((c) => {
    return c.month;
  });

  const data = {
    labels: [...months],
    datasets: [
    {
        
        label: label1,
        data: [...playerAttack],

        borderColor: label1==="Player X" ? 'green' : 'rgba(255,206,86,0.4)',
        backgroundColor: label1==="Player X" ? 'green' : 'rgba(255,206,86,0.4)',
        pointBackgroundColor: label1==="Player X" ? 'green' : 'rgba(255,206,86,0.4)',
        pointBorderColor: label1==="Player X" ? 'green' : 'rgba(255,206,86,0.4)',
      },
      compare
        ? {
            label: label2,
            data: [...comparedPlayerAttack],
            borderColor: label2==="Player X" ? 'green' : 'rgba(255,206,86,0.4)',
            backgroundColor: label2==="Player X" ? 'green' : 'rgba(255,206,86,0.4)',
            pointBackgroundColor: label2==="Player X" ? 'green' : 'rgba(255,206,86,0.4)',
            pointBorderColor: label2==="Player X" ? 'green' : 'rgba(255,206,86,0.4)',
          }
        : { label: "" },
    ],
  };
  return (
    <div className= "row container-fluid mb-2">
          <div className="mt-2">
        <label className="mr-2" htmlFor="player">
          Choose a player:
        </label>

        <select
          id="player"
          className="custom-select  custom-select-sm"
          onChange={changeHandler}
          value={selectedPlayer}
        >
     
          <option value="Player X">Player X</option>
          <option value="Player Y">Player Y</option>
        </select>
      </div>
    <div className="container-fluid col-4 ">

    <div className="column">
      <p className="attacking font-weight-bold">Attacking</p>
      <div className="row row-chart">
        <div className="chart">
      <Line data={data}/>
      </div>
      <div className="month">
      <p className="font-weight-bold">Month</p>
      </div>
      </div>
      <button className="btn btn-info" onClick={clickHandler}>{compare===false? (`Compare with ${label2}`) : `Donot Compare`}</button>
    </div>
    </div>
    </div>
  );
};

export default LineChart;
