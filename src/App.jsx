import React, { Fragment, useState, useEffect } from 'react';
import './equalize.css';
import './App.css';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const levels = [
  [ // 1 start @ [1][1]
    [2,1,1],
    [1,1,2],
    [1,1,2],
  ],
  [ // 2 start @ [2][2]
    [1,1,1,1],
    [1,1,1,1],
    [1,2,2,1],
    [1,1,1,1],
  ],
  [ // 3 start @ [2][2]
    [2,1,1,3],
    [2,1,2,1],
    [1,2,1,2],
    [1,2,1,2],
  ],
  [ // 4 start @ [1][1]
    [3,1,3,2],
    [1,2,2,1],
    [3,1,1,1],
    [1,1,1,3],
  ],
  [ // 5 start @ [0][0]
    [2,2,2,1],
    [2,1,1,1],
    [1,2,2,1],
    [2,1,1,2],
  ],
  [ // 6 start @ [1][2]
    [2,2,1,3],
    [2,2,2,1],
    [3,1,2,1],
    [1,1,1,2],
  ],
  [ // 7 start @ [3][3]
    [1,1,1,2],
    [1,1,1,2],
    [1,1,2,1],
    [2,1,3,3],
  ],
  [ // 8 start @ [0][1]
    [2,2,3,1],
    [2,2,1,1],
    [1,1,1,1],
    [3,2,2,3],
  ],
  [ // 9 start @ [0][0]
    [3,1,1,3],
    [3,1,2,1],
    [3,1,2,1],
    [2,1,1,3],
  ],
  [ // 10 start @ [0][0]
    [2,1,2,2],
    [2,2,2,1],
    [1,1,1,2],
    [1,2,3,1],
  ],
  [ // 11 start @ [0][0]
    [4,2,4,1,3],
    [3,2,1,1,1],
    [1,1,1,1,3],
    [2,1,1,1,1],
    [2,3,1,2,1],
  ],
  [ // 12 start @ [2][2]
    [1,1,2,1,1],
    [1,1,1,1,1],
    [1,3,2,2,1],
    [2,1,2,2,1],
    [2,3,1,2,1],
  ],
  [ // 13 start @ [2][2]
    [3,1,2,2,2],
    [1,1,2,1,2],
    [2,1,1,1,1],
    [1,2,1,1,4],
    [1,2,2,1,1],
  ],
  [ // 14 start @ [2][2]
    [1,2,1,2,2],
    [2,1,2,2,1],
    [2,3,2,3,1],
    [1,3,1,2,1],
    [3,1,1,1,3],
  ],
  [ // 15 start @ [1][1]
    [3,2,1,1,4],
    [2,3,1,3,1],
    [1,2,2,1,2],
    [1,1,2,1,1],
    [2,1,1,1,2],
  ],
  [ // 16 start @ [0][0]
    [3,1,1,3,1],
    [1,1,1,2,1],
    [2,2,1,2,1],
    [1,1,2,1,3],
    [4,2,1,1,4],
  ],
  [ // 17 start @ [1][2]
    [2,1,2,2,1],
    [1,1,3,1,1],
    [2,2,2,1,2],
    [1,1,3,1,1],
    [1,2,2,1,1],
  ],
  [ // 18 start @ [4][0]
    [1,2,3,3,1],
    [1,1,1,1,2],
    [2,2,2,3,2],
    [1,1,2,2,3],
    [4,2,4,1,3],
  ],
  [ // 19 start @ [2][1]
    [4,2,1,1,2],
    [3,1,1,1,3],
    [2,1,1,3,2],
    [2,2,1,1,3],
    [1,1,1,2,1],
  ],
  [ // 20 start @ [2][1]
    [1,1,1,3,3],
    [2,3,2,3,1],
    [2,1,1,1,2],
    [1,2,2,3,1],
    [2,2,2,2,1],
  ],
  [ // 21 start @ [4][4]
    [4,1,1,3,3],
    [3,1,1,1,3],
    [1,1,2,1,1],
    [4,1,1,2,2],
    [3,2,1,2,4],
  ],
  [ // 22 start @ [0][0]
    [1,2,2,1,2],
    [2,3,1,1,1],
    [1,3,1,2,4],
    [3,1,2,3,4],
    [2,1,1,1,4],
  ],
  [ // 23 start @ [2][2]
    [2,3,1,2,1],
    [1,1,2,3,2],
    [1,1,2,1,1],
    [1,2,1,1,3],
    [1,1,2,1,1],
  ],
  [ // 24 start @ [0][0]
    [3,4,3,1,3],
    [1,3,1,3,1],
    [4,1,1,2,2],
    [1,3,1,1,1],
    [2,3,1,4,2],
  ],
  [ // 25 start @ [2][3]
    [1,1,3,2,1],
    [3,1,2,2,1],
    [1,2,2,2,3],
    [1,2,1,1,3],
    [3,3,4,1,4],
  ],
];

const startPoint = [
  [1,1], //1
  [2,2], //2
  [2,2], //3
  [1,1],//4
  [0,0],//5
  [1,2],//6
  [3,3],//7
  [0,1],//8
  [0,0],//9
  [0,0],//10
  [0,0],//11
  [2,2],//12
  [2,2],//13
  [2,2],//14
  [1,1],//15
  [0,0],//16
  [1,2],//17
  [4,0],//18  
  [2,1],//19
  [2,1],//20
  [4,4],//21
  [0,0],//22
  [2,2],//23
  [0,0],//24
  [2,3],//25
]

let numTurns = 0;

let currentLevel = getRandomInt(25);
let boardSize = levels[currentLevel].length;
const board = levels[currentLevel];


const App = ()=> {
  const [selected, setSelected] = useState({ row: startPoint[currentLevel][0], col: startPoint[currentLevel][1] });
  //const [selected, setSelected] = useState({ row: -1, col: -1});
  const [selectedVal, setSelectedVal] = useState();
  const [removed, setRemoved] = useState([]);
  const [message, setMessage] = useState("QUARDINEX");

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
        <h2>Playing Level {currentLevel+1}</h2> 
        <Grid board={board}/>
    </div>
  );
}


export default App;