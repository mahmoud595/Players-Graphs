import React , {Component} from 'react'
import dataJson from "./data/data.json";
const MyContext = React.createContext()
const MyConsumer = MyContext.Consumer

const { playerx } = dataJson[0];
const { playery } = dataJson[1];

class MyProvider extends Component {
    state = {
        playerx,
        playery
    }
    render() {
        return (
            <MyContext.Provider value={
                 this.state
              
            }>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

export {MyProvider ,MyConsumer}