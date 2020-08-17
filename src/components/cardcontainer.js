import React, {Component} from 'react';
import Card from './card';
import Kakaofriends from "../kakaofriend.json"
import shuffle from "shuffle-array";

class CardContainer extends Component {
    constructor(props) {
        super(props);
        // setting the score and pulling json
        this.state = {
            score: 1,
            kakaofriends: Kakaofriends,
            selectedfriends: []
        };
    }

    // when the user clicks
    handleClick = (e) => {
        // grab the id
        let id = e.target.id;
        let exists = false;
        this.state.selectedfriends.forEach(kakaofriend => {
            // if id matches
            if (kakaofriend.id == id) {
                exists = true;
            }
        })
        // if exists is true
        if (exists) {
            // end the game
            this.endGame();
        }
        // otherwise
        else {
            // loop through the json
            this.state.kakaofriends.forEach(kakaofriend => {
                if (kakaofriend.id == id) {
                    // add to the selected array
                    this.setState({selectedfriends: [...this.state.selectedfriends,kakaofriend]});
                    console.log(this.state.selectedfriends);
                    // update the score
                    this.updateScore();
                }
            })  
        }
        
        // SHUFFLE
        this.setState({ kakaofriends: shuffle(this.state.kakaofriends)});
        console.log("Shuffling");
    }

    // Update game's score
    updateScore = () => {
        // new score
        this.setState({score: this.state.score + 1});
        // update score
        this.props.updateCurrentScore(this.state.score);
        console.log("Score: " + this.state.score);
    }

    // End game
    endGame = () => {
        console.log("End!");
        this.props.updateTopScore(this.state.score);
        this.setState({score: 1, selectedfriends: []});
        this.props.updateCurrentScore(0);
    }
    render() {
        return (
            <div className="container" id="card-container">
                <div className="row">
                    {Kakaofriends.map(kakaofriend => <Card src={kakaofriend.image} key={kakaofriend.id} id={kakaofriend.id} alt={kakaofriend.name} endGame={this.endGame} handleClick={this.handleClick} score={this.state.score} />)}
                </div>
            </div>
        );
    }
}

export default CardContainer;