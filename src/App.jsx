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






const App = ()=> {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selected, setSelected] = useState({ row: startPoint[currentLevel][0], col: startPoint[currentLevel][1] });
  const [selectedVal, setSelectedVal] = useState(0);
  const [removed, setRemoved] = useState([startPoint[currentLevel][0] + "," + startPoint[currentLevel][1]]);
  const [message, setMessage] = useState("QUARDINEX");
  const [board, setBoard] = useState(levels[currentLevel]);
  const [boardSize, setBoardSize] = useState(levels[currentLevel].length);

  useEffect(()=> {
    if (selected.row === -1) return;
    setSelectedVal(board[selected.row][selected.col]);
  }, [selected.row, selected.col, board]);


  const checkCell = (rowNum, colNum, targetable)=> {
    if (!targetable && selectedVal) return;
    else {
      setRemoved([...removed, rowNum + "," + colNum]);
    }

    setSelected({ row: rowNum, col: colNum });

    if (removed.length === (boardSize * boardSize)-1) {  // need to reset boardsize
      setMessage("BUTTONS PROPER FUCKED!");
    }
  }

  const loadLevel = (selectedLevel) => {
    const currentLevel = selectedLevel;
    setCurrentLevel(currentLevel);

    setBoard(levels[currentLevel]);
    

    setSelected({ row: startPoint[currentLevel][0], col: startPoint[currentLevel][1] });
    //setSelectedVal(null);
    setRemoved([startPoint[currentLevel][0] + "," + startPoint[currentLevel][1]]);
    setMessage("QUARDINEX");

    console.log(`${currentLevel}`);
    setBoardSize(levels[currentLevel].length);
    console.log(`BoardSize: ${boardSize}`);
    console.log(`${levels[currentLevel].length}`);
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

  const LevelSelect = ()=> {
    return (
      <div className="level-menu">
        <div className="level-menu-row">
        {
          levels.map((level, index)=> {
            return (
              <div className="level-number" onClick={()=> { loadLevel(index); }}>
               {index}
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
          [Turquoise Square] : You Are Here<br />
          [Orange Squares] : You Can Go Here.<br />
          [Numbers] : Move Amount<br />
          [Cream Squares] : Use This Info To Help Plan Ahead<br />
          <hr />
          You can move Up, Down, Left, or Right.<br />
          <hr />
          The number of spaces you can move from your position is determined by the number on that turquoise square.<br />
          <hr />
          When you select an Orange Target, that becomes your new position.<br />
          The Turquoise Square you just moved from is now removed.<br />
          <hr />
          Keep going until you land on one final square.  <br />
          WINNER WINNER CHICKEN DINNER!<br />
          <hr />
          Some boards may have more than one solution.<br />
          <hr />
          <strong>Upcoming Features</strong><br />
          Popup "Reload" button when no more moves left.<br />
          Popup "Next Level" button after beating level.<br />
          And bigger features that may not ever happen.<br />
        </div>

        <div className="game">
          <h2>{message}</h2>
          <h2>Playing Level {currentLevel+1}</h2>
          <div className="grid-container">
            <Grid board={board} />
          </div>
          <h3>Note: To reload level make note of your current level number at the top of the game,
          then click the level number to the right.` </h3>
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
