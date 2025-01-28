import React, { Fragment, useState, useEffect } from 'react';
import './equalize.css';
import './App.css';

var jsnx = require('jsnetworkx');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const levels = [
  [ // 1 start @ [0][1]  diff 1.286
    [2,1,1],
    [1,1,2],
    [1,1,2],
  ],
  [ // 3 start @ [2][2]   0.50
    [2,1,1,3],
    [2,1,2,1],
    [1,2,1,2],
    [1,2,1,2],
  ],
  [ // 15 start @ [1][1]  0.04
    [3,2,1,1,4],
    [2,3,1,3,1],
    [1,2,2,1,2],
    [1,1,2,1,1],
    [2,1,1,1,2],
  ],
  [ // 8 start @ [0][1]  0.67
    [2,2,3,1],
    [2,2,1,1],
    [1,1,1,1],
    [3,2,2,3],
  ],
  [ // 12 start @ [4][0]  0.10
    [1,1,2,1,1],
    [1,1,1,1,1],
    [1,3,2,2,1],
    [2,1,2,2,1],
    [2,3,1,2,1],
  ],
  [ // 21 start @ [4][4]  0.125
    [4,1,1,3,3],
    [3,1,1,1,3],
    [1,1,2,1,1],
    [4,1,1,2,2],
    [3,2,1,2,4],
  ],
  [ // 17 start @ [4][3]  0.13
    [2,1,1,2,1],
    [1,1,3,1,1],
    [2,2,2,1,2],
    [1,1,1,1,1],
    [1,2,2,1,1],
  ],
  [ // 13 start @ [2][2]  0.16
    [3,1,2,2,2],
    [1,1,2,1,2],
    [2,1,1,1,1],
    [1,2,1,1,4],
    [1,2,2,1,1],
  ],
  [ // 20 start @ [3][1]  0.25
    [1,1,1,3,3],
    [2,3,2,3,1],
    [2,1,1,1,2],
    [1,2,2,3,1],
    [2,2,2,2,1],
  ],
  [ // 7 start @ [3][3]  1.00
    [1,1,1,2],
    [1,1,1,2],
    [1,1,2,1],
    [2,1,3,3],
  ],
  [ // 2 start @ [2][2]   1.60
    [1,1,1,1],
    [1,1,1,1],
    [1,2,2,1],
    [1,1,1,1],
  ],
  [ // 4 start @ [1][1]   1.60
    [3,1,1,2],
    [1,2,2,2],
    [3,1,1,1],
    [2,1,1,3],
  ],
  [ // 10 start @ [0][0]  1.60
    [2,1,2,2],
    [2,2,2,1],
    [1,1,1,2],
    [1,2,3,1],
  ],
  [ // 11 start @ [0][0]  0.40
    [4,2,4,1,3],
    [3,2,1,1,1],
    [1,1,1,1,3],
    [2,1,1,1,1],
    [2,3,1,2,1],
  ],
  [ // 19 start @ [2][1]  0.42
    [4,2,1,1,2],
    [3,1,1,1,3],
    [2,1,1,3,2],
    [2,2,1,1,3],
    [1,1,1,2,1],
  ],
  [ // 14 start @ [2][2]  0.45
    [1,2,1,2,2],
    [2,1,2,2,1],
    [2,3,2,3,1],
    [1,3,1,2,1],
    [3,1,1,1,3],
  ],
  [ // 5 start @ [0][0]   2.00
    [2,2,2,1],
    [2,1,1,1],
    [1,2,2,1],
    [2,1,1,2],
  ],
  [ // 9 start @ [0][0]  2.67
    [3,1,1,3],
    [3,1,2,1],
    [3,1,2,1],
    [2,1,1,3],
  ],
  [ // 24 start @ [0][0]  0.64
    [3,4,3,1,3],
    [1,3,1,3,1],
    [4,1,1,2,2],
    [1,3,1,1,1],
    [2,3,1,4,2],
  ],
  [ // 16 start @ [0][0]  0.78
    [3,1,1,3,1],
    [1,1,1,2,1],
    [2,2,1,2,1],
    [1,1,2,1,3],
    [4,2,1,1,4],
  ],
  [ // 23 start @ [2][2]  1.087
    [2,3,1,2,1],
    [1,1,2,3,2],
    [1,1,2,1,1],
    [1,2,1,1,3],
    [1,1,2,1,1],
  ],
  [ // 18 start @ [4][0]  1.39
    [1,2,3,3,1],
    [1,1,1,1,2],
    [2,2,2,3,2],
    [1,1,2,2,3],
    [4,2,4,1,3],
  ],
  [ // 22 start @ [0][0]  2.27
    [1,2,2,1,2],
    [2,3,1,1,1],
    [1,3,1,2,4],
    [3,1,2,3,4],
    [2,1,1,1,4],
  ],
  [ // 25 start @ [2][3]  3.57
    [1,1,3,2,1],
    [3,1,2,2,1],
    [1,2,2,2,3],
    [1,2,1,1,3],
    [3,3,4,1,4],
  ],
  [ // 6 start @ [2][3]  5.33
    [2,1,1,3],
    [1,2,2,1],
    [2,1,1,2],
    [1,1,3,1],
  ],
]

const startPoint = [
  [0,1], //1
  [2,2], //3
  [1,1], //15
  [0,1], //8
  [4,0], //12
  [4,4], //21
  [4,3], //17
  [2,2], //13
  [3,1], //20
  [3,3], //7
  [2,2], //2
  [1,1], //4
  [0,0], //10
  [0,0], //11
  [2,1], //19
  [2,2], //14
  [0,0], //5
  [0,0], //9
  [0,0], //24
  [0,0], //16
  [2,2], //23
  [4,0], //18
  [0,0], //22
  [2,3], //25
  [2,3], //6
]

const App = ()=> {

  const [currentLevel, setCurrentLevel] = useState(0);
  const [selected, setSelected] = useState({ row: startPoint[currentLevel][0], col: startPoint[currentLevel][1] });
  const [selectedVal, setSelectedVal] = useState(0);
  const [removed, setRemoved] = useState([startPoint[currentLevel][0] + "," + startPoint[currentLevel][1]]);
  const [message, setMessage] = useState("QUARDINEX");
  const [reloadButton, setReloadButton] = useState("Reload Level");
  const [board, setBoard] = useState(levels[currentLevel]);
  const [boardSize, setBoardSize] = useState(levels[currentLevel].length);
  let win =() => (removed.length === (boardSize * boardSize)-1)?true:false;

  useEffect(()=> {
    if (selected.row === -1) return;
    setSelectedVal(board[selected.row][selected.col]);
  }, [selected.row, selected.col, board]);


  const checkCell = async (rowNum, colNum, targetable)=> {
    if (!targetable && selectedVal) return;
    else {
      await setRemoved([...removed, rowNum + "," + colNum]);
      console.log(removed);
    }
    setSelected({ row: rowNum, col: colNum });

    if(win()) {
      setMessage("Winner Winner 🍗 Chicken Dinner ");
      setReloadButton("Load Next Level");
      console.log("inside win_check ", win());
      console.log(removed.length, boardSize)
    }
  }

  const loadLevel = async (selectedLevel) => {
    console.log(win());
    console.log(removed, boardSize)
    //if (win()) {selectedLevel++};
    await setCurrentLevel(selectedLevel);
    setBoard(levels[currentLevel]);
    setSelected({ row: startPoint[currentLevel][0], col: startPoint[currentLevel][1]});
    setRemoved([]);
    setMessage("QUARDINEX");
    setReloadButton("Reload Level");
    setBoardSize(levels[currentLevel].length);
  }

  const Cell = ({cell, rowNum, colNum})=> {
    let cellStyle = "cell";
    let targetable = false;

    if ((rowNum === selected.row-selectedVal && colNum === selected.col) ||
        (rowNum === selected.row+selectedVal && colNum === selected.col) ||
        (rowNum === selected.row && colNum === selected.col-selectedVal) ||
        (rowNum === selected.row && colNum === selected.col+selectedVal)) {
      cellStyle += " cell-target";
      targetable = true;
    }

    if (removed.indexOf(rowNum + "," + colNum) !== -1) {
      cellStyle += " cell-removed";
      targetable = false;
    }

    if (selected.row === rowNum && selected.col === colNum) {
      cellStyle += " cell-active";
      targetable = false;
    }

    return (
      <div className={cellStyle} onClick={()=> { checkCell(rowNum, colNum, targetable) }}>{cell}</div>
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
  const Reload = ()=> {
    return (
        <div align="center" className="reload" onClick={()=> { loadLevel(currentLevel); }}>
        {reloadButton}
        </div>
    );
  }

  const LoadNextLevel = ()=> {
    return (
        <div align="center" className="reload" onClick={()=> { loadLevel(currentLevel+1); }}>
        {reloadButton}
        </div>
    );
  }
  
  const LevelSelect = ()=> {
    return (
      <div className="level-menu">
        <div className="level-menu-row">
        {
          levels.map((level, index)=> {
            return (
              <div className="level-number" onClick={()=> { loadLevel(index); }}>
               {index+1}
              </div>
            )
          })
        }
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <div className="instructions">
          <h2>&nbsp;</h2>
          <h2>Instructions</h2>
          Welcome to Quardinex! Your mission is to visit every square on the board.<br />
          <hr />
          1. Your goal is to clear the board.<br />
          2. You are located at the [Turquoise Square].<br />
          3. The number on the [Turquoise Square] is how many spaces away [Up, Down, Left, Right] that you can move.<br />
          4. The cream squares cannot be jumped to (they are not valid targets).<br />
          5. The orange squares are valid targets (using the movement rule from #3).<br />
          6. Each time you move, the target square you clicked becomes turquoise, and the old turquoise square you were on is removed.<br />
          7. Continue the above until all you land on the last square, at which point you win; or til you can no longer make a valid move.<br  />
          8. "Press Reload to Reload the level."<br />
          9. You may, at any time, press a different level* number.<br />
          <hr />
          Note: Levels are not sorted by any particular difficulty, just by number of squares.<br />
          <hr />
          <strong>Upcoming Features</strong><br />
          Popup "Next Level" button after beating level.<br />
          Backend: Solver that will help build difficulty calculator.<br />
          Keep track of which possible solutions for each puzzle been completed by player.<br />
          Hint System (using the above, including the ability to give "ranked" clues (e.g. The "Easy" clue gives you many possible solutions from this step; A "Hard" clue is narrow and fewer possible solutions from this step)).<br />
          Puzzle Generator (really important for next idea):<br />
          Dailies, 3 bord sizes and 3 difficulty levels per board size.<br />2
        </div>

        <div className="game">
          <h2>{message}</h2>
          <h2>Playing Level {currentLevel+1}</h2>
          <h2><Reload reload={currentLevel} /></h2>
          <div className="grid-container">
            <Grid board={board} />
          </div>
        </div>

        <div className="levelselect">
          <h2>&nbsp;</h2>
          <h2>Level Select</h2>
          <div className="level-menu-container">
            <LevelSelect />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
