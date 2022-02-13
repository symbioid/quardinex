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
	console.log(`adding targets!`);
	for(let row=0; row < boardSize; row++) {
		for (let col=0; col<boardSize; col++ ) {
			for (let i = 0; i<numPolySides; i++) {
				let targetRow = row + board[row][col].value * directionMatrix[i];
				let targetCol = col + board[row][col].value * directionMatrix[i];

				if ((targetRow < 0 | targetRow>= boardSize) | (targetCol < 0  | targetCol >= boardSize)) {
					board[row][col].targets[i] = null;
					board[row][col].targets[i] = null;

					if(i % 2 === 0) {
						console.log(`[${targetRow}][${col}]`);
					} else {
						console.log(`[${row}][${targetCol}]`);
					}
					console.log(`board [${row}][${col}] (${i}) | [-][-]`);
				}
				else if (i % 2 === 0 ){
					board[row][col].targets[i] = board[targetRow][col];
						console.log(`board [${row}][${col}] (${i}) | [${board[row][col].targets[i].row}][${board[row][col].targets[i].col}]`);
					} else {
						board[row][col].targets[i] = board[row][targetCol];
						console.log(`board [${row}][${col}] (${i}) | [${board[row][col].targets[i].row}][${board[row][col].targets[i].col}]`);
					}
			}
			console.log(`----------------------------------`)
		}
		console.log(`----------------------------------`)
	}
}


let displayTargets = (board) => {
	for (let row=0; row < boardSize; row++){
		for (let col=0; col<boardSize; col++){
			for(let i = 0; i < numPolySides; i++){
				if(board[row][col].targets[i] != null) {
					console.log(`board [${row}][${col}] (${i}) : [${board[row][col].targets[i].row}][${board[row][col].targets[i].col}]`);
				} else {
					console.log(`board [${row}][${col}] (${i}) : [-][-]`);
				}
			}
		}
	}
}

board = buildBoard();
//displayBoard(board);
addTargets(board);
//displayTargets(board);