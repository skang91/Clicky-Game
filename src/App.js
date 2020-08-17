import React, { Component} from 'react';
import './App.css';
import Navbar from "./components/navbar";
import Header from "./components/header";
import CardContainer from "./components/cardcontainer"

class App extends Component {
  // the state
  state = {
    count: 0,
    topScore: 0
  }
  // current score
  updateCurrentScore = (newCount) => {
    this.setState({count: newCount});
  }

  // top score
  updateTopScore = (newTop) => {
    // if the new top score is higher than the current
    if (newTop > this.state.topScore) {
      // then set the state but you have to subtract 1
      this.setState({topScore: newTop - 1})
    }
  }

  render() {
    return (
      <div>
        <Navbar score={this.state.count} top={this.state.topScore}/>
        <Header/>
        <CardContainer updateCurrentScore={this.updateCurrentScore} updateTopScore={this.updateTopScore}/>
      </div>
    );
  }
}

export default App;