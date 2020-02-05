import React from 'react';
import './App.css';

export default class App extends React.Component{

  constructor(props){
      super(props);
      this.state={
          board: [],
          rows:7,
          columns:6,
          currentPlayer: "Blue",
          blueScore:0,
          yellowScore:0,
          gameWon:false,
          winMessage:''
      }
  }
  componentDidMount = () =>{
      let data = this.state.board;
      //fill this array with something that can be tracked 
      for(let i=0; i<this.state.rows; i++){
          let row=[];
          for(let j=0; j<this.state.columns; j++){
              row.push("w");
          }
          data.push(row);
      }
      console.log(data);
      

      this.setState({
          board: data
      });
  }
  render(){
          
      return (
     // each component state is independent of each other

          <div>
              <div className="title">
                  <h2>Connect 4</h2>
                  <button onClick={this.newGame}>New Game</button>
                  <p className="winMessage">{this.state.winMessage}</p>
              </div>
              
              <table>
                  
                  <tbody>
                      {this.state.board.map((row,i)=> {
                          return(
                              <tr key={i}>
                                  {   //map over the row key to loop over 2D arrays
                                      row.map((columns,j) => {
                                          return(
                                              <td key={j}>
                                                  <svg width="65" height="65">
                                                      <rect className={columns} id={columns}
                                                          onClick={!this.state.gameWon ? this.onClick:null}
                                                          // need index i to identify which row is being clicked
                                                          data-index={i}
                                                          x="0"
                                                          y="0"
                                                          rx="30"
                                                          ry="30"
                                                          width="60"
                                                          height="60" 
                                                          // this put is whether the array holds an r or y
                                                          // default is w for white (displays as default black)
                                                          />
                                                  </svg>
                                              </td>
                                          )
                                      })
                                  }
                              </tr>)
                          })
                      }
                  </tbody>
              </table>

              <div className="currentPlayer">
                  <p>Current Player: {this.state.currentPlayer}</p>
              </div>
              <div className="blueScore">
                  <h3>Blue: {this.state.blueScore}</h3>
              </div>
              <div className="yellowScore">
                  <h3>Yellow: {this.state.yellowScore}</h3>    
              </div>
                  
             
          </div>
      );
  }

  newGame =()=>{
      this.setState({
          gameWon:false,
          board:[],
          winMessage:'',
          
      },()=>{this.componentDidMount();});
  }


  onClick= (event) =>{
     const index = (event.target.dataset.index);
     const token = this.state.currentPlayer;
      
      this.setState(state =>{
          const data = [...state.board];
          
          const w = (element) => element === "w";
          let location = data[index].findIndex(w);
         
          data[index][location] = token;
          if(state.currentPlayer==="Blue"){
              state.currentPlayer = "Yellow";
          }
          else{
              state.currentPlayer = "Blue";
          }

          return{
              board:data,
              currentPlayer:state.currentPlayer
              
          }
          
          //this ensures that the checkboard function runs directly after onCLick has completed
      },()=>{this.checkBoard();});
      
  }

  checkBoard = () =>{
      const boardState = this.state.board;
      
      for(let i=0; i<this.state.rows;i++){
          
          for(let j=0; j<this.state.columns;j++){
             
              if(boardState[i][j] !=="w"){
                  if(boardState[i][j] === boardState[i][j+1] &&
                      boardState[i][j] === boardState[i][j+2] &&
                      boardState[i][j] === boardState[i][j+3]){
                          this.winMessage(boardState[i][j]);
                  }
                                                
              }          
          }
      }

      //this -3 is to stop searches going off the end of the array
      for(let i=0; i<this.state.rows-3;i++){
          for(let j=0; j<this.state.columns;j++){
              if(boardState[i][j] !=="w"){
                  if(boardState[i][j] === boardState[i+1][j] &&
                      boardState[i][j] === boardState[i+2][j] &&
                      boardState[i][j] === boardState[i+3][j]){
                          this.winMessage(boardState[i][j]);
                          
                  }
              }
              if(boardState[i][j] !=="w"){
                  if(boardState[i][j] === boardState[i+1][j+1] &&
                      boardState[i][j] === boardState[i+2][j+2]&&
                      boardState[i][j] === boardState[i+3][j+3]){
                          this.winMessage(boardState[i][j]);
                  }
              }
              if(boardState[i][j] !=="w"){
                  if(boardState[i][j] === boardState[i+1][j-1] &&
                      boardState[i][j] === boardState[i+2][j-2]&&
                      boardState[i][j] === boardState[i+3][j-3]){
                          this.winMessage(boardState[i][j]);
                  }                                 
              }
          }                                  
      }      
  }

  winMessage = (key) =>{
      
      if(key==="Blue"){
          this.setState(oldState => ({
          gameWon:true,
          winMessage:"Blue Has won the game",
          blueScore: oldState.blueScore + 1
          
      
      }));
              
      }
      else{
          this.setState(oldState => ({
          gameWon:true,
          winMessage:"Yellow Has won the game",
          yellowScore: oldState.yellowScore + 1
      
      }));
      }
      
      
  
  }   
}

