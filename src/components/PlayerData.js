import React, { useState, useEffect } from "react";

const PlayerData = (props) => {
  const [player, setPlayer] = useState("Player X");
  const [month, setMonth] = useState("Dec");
  const [checked , setChecked] =useState(false)

  const changeMonth = (e) => {
    setMonth(e.target.value);
  };

  const changePlayer = (e) => {
    setPlayer(e.target.value);
  };
  const handleCheck =(e)=>{
      setChecked(!checked)
  }
  const handleChoose = () => {
    props.playerSelected(player);
    props.monthSelected(month);
    props.averageMonthsChecked(checked)
  };

  useEffect(() => {
    handleChoose();
    return () => {
      handleChoose();
    };
  }, [player, month ,checked]);
  
  return (
    <div className="">
      <h4 className="mb-4">View graph For one Player with selected month</h4>
   
      <div className="mt-2">
        <label className="mr-2" htmlFor="player">
          Choose a player:
        </label>

        <select
          id="player"
          className="custom-select col-3 custom-select-sm"
          onChange={changePlayer}
          value={player}
        >
          
          <option value="Player X">Player X</option>
          <option value="Player Y">Player Y</option>
        </select>
      </div>
      <br />
      <div className="mt-3">
        <label className="mr-2" htmlFor="month">
          Choose a month:
        </label>

        <select
          className="custom-select col-3 custom-select-sm"
          id="month"
          onChange={changeMonth}
          value={month}
        >
          <option value="Dec">December</option>
          <option value="Jan">January</option>
          <option value="Feb">February</option>
          <option value="Mar">March</option>
          <option value="Apr">April</option>
        </select>
      </div>
      <br/>
      <h4>Average data in all months</h4>
      <div className="input-group-prepend">
    <div className="input-group-text mt-2">
 
    <label className="mr-2 " htmlFor="month">
          Average data 
        </label>
      <input onChange={handleCheck} type="checkbox" aria-label="Checkbox for following text input"/>
    
    </div>
  </div>
  <br/>

    </div>
  );
};

export default PlayerData;
