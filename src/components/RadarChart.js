import React from 'react';
import RadarChart from 'react-svg-radar-chart';
import dataJson from "../data/data.json";
import 'react-svg-radar-chart/build/css/index.css'

import PlayerData from './PlayerData'
const { playerx } = dataJson[0];
const { playery } = dataJson[1];
export default class MyRadarComp extends React.Component {
  
    state = {
       player :playery,
       comparedPlayer :playerx,
       selectedPlayer:'',
       unselectedPlayer:'',
       month:'Dec',
       comparedMonth: 'Dec',
       checked:false,
       compare:false,
       compareChecked:false,
       playerxColor:'green',
       playeryColor: 'wheat'

    };
    
    playerSelected =(data)=>{
      this.setState({
        selectedPlayer:data,
        
      })
      // data==='Player X' ?this.setState({player:playerx}):this.setState({player:playery})
      if(data==='Player X'){
        this.setState({
          player:playerx,
          comparedPlayer:playery,
          unselectedPlayer:'Player Y'
        })
        
       
      }
      else if (data==="Player Y"){
        this.setState({
          player:playery,
          comparedPlayer:playerx,
          unselectedPlayer:'Player X'
        })
      }
    }
    monthSelected =(data)=>{
      this.setState({
        month: data
      })
    }
    averageMonthsChecked = (data)=>{
      this.setState({
        checked:data
      })
  }    
      changeComparedMonth =(e)=>{
        this.setState({
          comparedMonth:e.target.value
        })
      }
      clickHandler =()=>{
        this.setState({
          compare:!this.state.compare
        })
      }

      averageChecked=()=>{
        this.setState({
          compareChecked:!this.state.compareChecked
        })
      }
  
  render(){
    const {player ,month , checked ,compare ,comparedPlayer ,comparedMonth, unselectedPlayer ,selectedPlayer,playerxColor,playeryColor ,compareChecked} = this.state
    const filteredMonth = player.find((p)=>{
     return p.month === month
    })
    const playerSelected = player.find((p)=>{
      return p.month === comparedMonth
     })
     const playerCompared = comparedPlayer.find((p)=>{
      return p.month === comparedMonth
     })

    const {Attacking ,Passing ,Technical ,Creativity,Defencive} =filteredMonth
  
    console.log(comparedMonth , playerCompared ,playerSelected)
     var avg = Array.from(player.reduce(
      (acc, obj) => Object.keys(obj).reduce( 
          (acc, key) => typeof obj[key] == "number"
              ? acc.set(key, ( // immediately invoked function:
                      ([sum, count]) => [sum+obj[key], count+1] 
                  )(acc.get(key) || [0, 0])) // pass previous value
              : acc,
      acc),
  new Map()), 
      ([name, [sum, count]]) => ({ name, average: sum/count })
  );
  var avgCompared = Array.from(comparedPlayer.reduce(
    (acc, obj) => Object.keys(obj).reduce( 
        (acc, key) => typeof obj[key] == "number"
            ? acc.set(key, ( // immediately invoked function:
                    ([sum, count]) => [sum+obj[key], count+1] 
                )(acc.get(key) || [0, 0])) // pass previous value
            : acc,
    acc),
new Map()), 
    ([name, [sum, count]]) => ({ name, average: sum/count })
);
console.log(avgCompared)
    const AttackingAvg = avg[0].average 
    const PassingAvg = avg[1].average  
    const TechnicalAvg = avg[2].average  
    const CreativityAvg = avg[3].average  
    const DefenciveAvg = avg[4].average   

    const AttackingAvgCompared = avgCompared[0].average 
    const PassingAvgCompared = avgCompared[1].average  
    const TechnicalAvgCompared = avgCompared[2].average  
    const CreativityAvgCompared = avgCompared[3].average  
    const DefenciveAvgCompared = avgCompared[4].average            

    const tooltipstyle = {
        position: 'relative',
        display: 'inline-block',
        borderBottom: '1px dotted black'
    }

    const tooltiptextstyle = {
        visibility: 'hidden',
        width: '220px',
        backgroundColor: 'black',
        color: '#fff',
        textAlign: 'center',
        borderRadius: '6px',
        padding: '5px 0',
    
        /* Position the tooltip */
        position: 'absolute',
        zIndex: '1',
    }


  let data 
  if(checked===false && compare===false){
 data =  [
      {
        data: {
          Attacking:Attacking/100 ,
          Passing:Passing/100,
          Technical: Technical/100,
          Creativity: Creativity/100,
          Defencive: Defencive/100
        },
        meta: { color: selectedPlayer==='Player X' ? playerxColor : playeryColor }
      }

    ]
  }
  else if (checked === false && compare ===true && compareChecked===false){
    data =  [
      {
        data: {
          Attacking:playerSelected.Attacking/100 ,
          Passing:playerSelected.Passing/100,
          Technical: playerSelected.Technical/100,
          Creativity: playerSelected.Creativity/100,
          Defencive: playerSelected.Defencive/100
        },
        meta: { color: selectedPlayer==='Player X' ? playerxColor : playeryColor }
      },
      {
      data: {
        Attacking:playerCompared.Attacking/100 ,
        Passing:playerCompared.Passing/100,
        Technical: playerCompared.Technical/100,
        Creativity: playerCompared.Creativity/100,
        Defencive: playerCompared.Defencive/100
      },
      meta:{ color: unselectedPlayer==='Player X' ? playerxColor : playeryColor }
    }
    ]
  }
  else if (checked === false && compare ===true && compareChecked===true){
    data =  [
      {
        data: {
          Attacking:avg[0].average/100,
          Passing:avg[1].average/100,
          Technical: avg[2].average/100,
          Creativity:avg[3].average/100,
          Defencive: avg[4].average/100
        },
        meta: { color: selectedPlayer==='Player X' ? playerxColor : playeryColor }
      },
      {
      data: {
        Attacking:avgCompared[0].average/100,
        Passing:avgCompared[1].average/100,
        Technical: avgCompared[2].average/100,
        Creativity:avgCompared[3].average/100,
        Defencive: avgCompared[4].average/100
      },
      meta:{ color: unselectedPlayer==='Player X' ? playerxColor : playeryColor }
    }
    ]
  }
  else if (checked===true){
    data=[ {
        data: {
          Attacking:avg[0].average/100,
          Passing:avg[1].average/100,
          Technical: avg[2].average/100,
          Creativity:avg[3].average/100,
          Defencive: avg[4].average/100
        },
        meta: { color: selectedPlayer==='Player X' ? playerxColor : playeryColor}
      }
    ]

  }

    // const noSmoothing = points => {
    //     let d = 'M' + points[0][0].toFixed(4) + ',' + points[0][1].toFixed(4);
    //     for (let i = 1; i < points.length; i++) {
    //       d += 'L' + points[i][0].toFixed(4) + ',' + points[i][1].toFixed(4);
    //     }
    //     return d + 'z';
    //   };
       
      const defaultOptions = {
        size: 200,
        axes: true, // show axes?
        scales: 1, // show scale circles?
        captions: true, // show captions?
        captionMargin: 15,
        dots: false, // show dots?
        zoomDistance: 1.2, // where on the axes are the captions?
        setViewBox: (options) => `-${options.captionMargin} 0 ${options.size + options.captionMargin * 2} ${options.size}`, // custom viewBox ?
        // smoothing: noSmoothing, // shape smoothing function
        axisProps: () => ({ className: 'axis' }),
        scaleProps: () => ({ className: 'scale', fill: 'none' }),
        shapeProps: () => ({ className: 'shape' }),
        captionProps: () => ({
          className: 'caption',
          textAnchor: 'middle',
          fontSize: 19,
          fontFamily: 'fantasy'
        
        }),
        // dotProps: () => ({
        //   className: 'dot',
        //   mouseEnter: (dot) => { 
        //       document.getElementById("tooltip").innerText = "index: " + dot.idx + ", key: " + dot.key + ", value: " + dot.value;
        //       document.getElementById("tooltip").style.visibility = "visible";
        //     },
        //   mouseLeave: (dot) => { 
        //       document.getElementById("tooltip").innerText = "";
        //       document.getElementById("tooltip").style.visibility = "hidden";
        //     }
        // })
      };
 
    return (
      <div className='row container-fluid'>
        <div className="column">
        <PlayerData playerSelected={this.playerSelected}
         monthSelected={this.monthSelected}
         averageMonthsChecked={this.averageMonthsChecked} />
         <hr style={{ borderTop: "2px solid rgba(0, 0, 0, 0.1)"}}/>
           <h4 className="mb-4">Compare with {this.state.unselectedPlayer} </h4>
           <div className="mt-3">
        <label className="mr-2" htmlFor="month">
          Compare with a month:
        </label>

        <select
          className="custom-select col-3 custom-select-sm"
          id="month"
          onChange={this.changeComparedMonth}
          value={this.statecomparedMonth}
        >
          <option value="Dec">December</option>
          <option value="Jan">January</option>
          <option value="Feb">February</option>
          <option value="Mar">March</option>
          <option value="Apr">April</option>
        </select>
      </div>
      <h4 className="mt-3">Compare data on total average</h4>
      <div className="input-group-prepend">
    <div className="input-group-text mt-2">
 
    <label className="mr-2 " htmlFor="month">
          compare based on average data
        </label>
      <input onChange={this.averageChecked} type="checkbox" aria-label="Checkbox for following text input"/>
    
    </div>
  </div>
      <button className="btn btn-info mt-5" onClick={this.clickHandler}>{compare===false? (`Compare with ${unselectedPlayer}`) : `Donot Compare`}</button>
           </div>
         <div className="column " >
           <div className="h5 attacking-data d-flex justify-content-center pt-1">
             
           {checked?AttackingAvg:(compare?(compareChecked?AttackingAvg+"/"+AttackingAvgCompared:
            playerSelected.Attacking+"/"+playerCompared.Attacking):Attacking)}
           
           </div>
           <div className="h5 d-flex align-items-center ">
             <div className="defencive-data">
             {checked?DefenciveAvg:(compare?(compareChecked?DefenciveAvg+"/"+DefenciveAvgCompared:
            playerSelected.Defencive+"/"+playerCompared.Defencive):Defencive)}
             </div>
          
        <RadarChart
            captions={{
              // columns
              Attacking: ` Attacking`,
              Passing: ` Passing`,
              Technical: ` Technical`,
              Creativity: ` Creativity`,
              Defencive: ` Defencive`
            }}
            data={data}
            size={500}
            options={defaultOptions}
          />
          
          <div className="">
          {checked?PassingAvg:(compare?(compareChecked?PassingAvg+"/"+PassingAvgCompared:
            playerSelected.Passing+"/"+playerCompared.Passing):Passing)}
             </div>
          </div>
          <div className=" d-flex justify-content-between" >
            <div className="h5">
            {checked?CreativityAvg:(compare?(compareChecked?CreativityAvg+"/"+CreativityAvgCompared:
            playerSelected.Creativity+"/"+playerCompared.Creativity):Creativity)}
            </div>
           <div className="h5 ">
           {checked?TechnicalAvg:(compare?(compareChecked?TechnicalAvg+"/"+TechnicalAvgCompared:
            playerSelected.Technical+"/"+playerCompared.Technical):Technical)}
           </div>
           </div>
           <div className="text-center">
           <p className=" text-center font-weight-bold mt-2" style={{backgroundColor:`${playerxColor}`, display: 'inline-block'}}>Player X</p>
           <p className="  text-center font-weight-bold mt-2 ml-1" style={{backgroundColor:`${playeryColor}`,display: 'inline-block'}}>Player Y</p>
           </div>
           <p></p>
          <div id="divtool" style={tooltipstyle}><label id="tooltip" style={tooltiptextstyle}></label></div>
          </div>
        </div>
    )
    
  }
}
