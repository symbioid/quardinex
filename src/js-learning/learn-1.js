const boardSize = 3;
const numPolySides = 4;
const level = [ [2, 1, 1],
				[1, 1, 2],
				[1, 1, 2]
			  ];
const directionMatrix = [-1,1,1,-1];

board = [[],[],[]];

let targetRow = 0;
let targetCol = 0;

let node = {
	row : -1,
	col : -1,
	value : 0,
	visited : false,
	targets : [],
	lastTargetDirection : 0
}

let buildNode = (row, col, val) => {
	let tempNode = { ... node }
	tempNode.row = row;
	tempNode.col = col;
	tempNode.value = val
	return tempNode
}

let getNode = (board, row, col) => {
	return board[row][col]
}

let buildBoard = () => {
	console.log(`Building Board \n...`)
	for(let row=0; row < boardSize;row++){
		for(let col=0; col < boardSize; col++){
			val = level[row][col];
			board[row][col] = buildNode(row,col,val);
		}
	}
	console.log(`Board Built!`)
	console.log(`----------------------------------`)
	return board;
}

let displayBoard = (board) => {
	console.log(`Displaying Board...`);
	for (row = 0; row < boardSize; row++){
		for(col = 0; col < boardSize; col++){
			console.log(`${board[row][col].value}`);
		}
	}
}

let addTargets = (board) => {
	for(let row=0; row < boardSize; row++) {
		for (let col=0; col<boardSize; col++ ) {
			console.log(`Board[${row}][${col}] =  ${board[row][col].value}`);
			for (let i = 0; i<numPolySides; i++) {
				if(i % 2 === 0) {
					targetRow = row + board[row][col].value * directionMatrix[i];
					targetCol = col;
				} else {
					targetRow = row;
					targetCol = col + board[row][col].value * directionMatrix[i];

				}
				console.log(`TARGET [${i}] ACQUIRED: [${targetRow}][${targetCol}]`);

				//------bounds checking - any target whose (row | col) (< 0 | >boardsize) get set "NULL"
                if ((targetRow < 0 | targetRow>= boardSize) | (targetCol < 0  | targetCol >=  boardSize)) {
						board[row][col].targets[i] = null;
						console.log(`[${targetRow}][${targetCol}] ASSIGNING TARGET[${i}] = [NULL] // (Out Of Bounds)`)
				}
				else {
					board[row][col].targets[i] = board[targetRow][targetCol];
					console.log(`[${targetRow}][${targetCol}] ASSIGNING TARGET[${i}] = [${targetRow}][${targetCol}]`)
				}
			}
			console.log(`----------------------------------`)
		}
		console.log(`----------------------------------`)
	}
}


board = buildBoard();
displayBoard(board);
addTargets(board);
