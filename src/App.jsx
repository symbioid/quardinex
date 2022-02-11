import React, { Fragment, useState, useEffect } from 'react';
import './equalize.css';
import './App.css';

const board = [
  [2,1,1],
  [1,1,2],
  [1,1,2]
];

let boardSize = 3;
let maxMove = 2;

// Randomize board
// const board = Array(boardSize).fill().map(()=> 
//   Array(boardSize).fill().map(()=> 
//     Math.floor(Math.random() * maxMove) + 1
//   )
// );


const App = ()=> {

  const [selected, setSelected] = useState({ row: -1, col: -1 });
  const [selectedVal, setSelectedVal] = useState();
  const [removed, setRemoved] = useState([]);
  const [message, setMessage] = useState("FUCKBUTTONS");


  useEffect(()=> {
    if (selected.row === -1) return;
    setSelectedVal(board[selected.row][selected.col]);
  }, [selected]);


  const checkCell = (rowNum, colNum, hit)=> {
    if (!hit && selectedVal) return;    
    else {
      setRemoved([...removed, rowNum + "," + colNum]);
    }

    setSelected({ row: rowNum, col: colNum });

    if (removed.length === (boardSize * boardSize)-1) {
      setMessage("BUTTONS PROPER FUCKED!");
    }
  }


  const Cell = ({cell, rowNum, colNum})=> {
    let cellStyle = "cell";
    let hit = false;

    if ((rowNum === selected.row-selectedVal && colNum === selected.col) ||
        (rowNum === selected.row+selectedVal && colNum === selected.col) ||
        (rowNum === selected.row && colNum === selected.col-selectedVal) ||
        (rowNum === selected.row && colNum === selected.col+selectedVal)) {
      cellStyle += " cell-target";
      hit = true;
    }

    if (removed.indexOf(rowNum + "," + colNum) !== -1) {
      cellStyle += " cell-removed";
      hit = false;
    }

    if (selected.row === rowNum && selected.col === colNum) {
      cellStyle += " cell-active";
      hit = false;
    }

    return (
      <div className={cellStyle} onClick={()=> { checkCell(rowNum, colNum, hit) }}>{cell}</div>
    );
  }


  const Row = ({row, rowNum})=> {
    return (
      <div className="row">

        {row.map((cell, index)=> {
          return ( <Cell cell={cell} rowNum={rowNum} colNum={index} key={index}/> )
        })}

      </div>
    );
  }


  const Grid = ({board})=> {
    return (
      <div className="grid">

        {board.map((row, index)=> {
          return ( <Row row={row} rowNum={index} key={index}/> )
        })}

      </div>
    );
  }


  return (
    <div className="app">
        <h2>{message}</h2>

        <Grid board={board}/>
    </div>
  );
}


export default App;