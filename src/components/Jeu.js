import React, { Component } from 'react'
import Plateau from './Plateau';

export default class Jeu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                { squares: Array(9).fill(null) }
            ]
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const gagnant = calcul(squares);
        if (gagnant || squares[i]) {
            return;
        } 
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });

    }
    
    // Methode pour reset le jeu (refresh le plateau)
restartJeu(event) {
  window.location.reload();
}

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const gagnant = calcul(current.squares);
     
        let status;
        if (gagnant) {
            status = 'Le gagnant est ' + gagnant ;
            
        } else {
            status = 'Au tour de ' + (this.state.xIsNext ? 'X' : 'O');
        } 


        return ( 
            <div className="header">
                        <h1>Tic Tac Toe Retro</h1>
            <div className="rejouer"><button className="rejouer"
     onClick={ this.restartJeu.bind(this) }>Rejouer </button></div>

                    
            
            <div className="jeu">
            
             <div className="infos">
                        <div>{status}</div>
                    </div>
                
                    <div className="game-board">
                        <Plateau onClick={(i) => this.handleClick(i)}
                            squares={current.squares} />
                    </div>
                   

            </div>
</div>
        )
    }
}

//méthode de détection du gagnant
function calcul(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    } 

    return null;
}