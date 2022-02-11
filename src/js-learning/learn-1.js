console.log("hello world!");
const boardSize = 3;
const numPolySides = 4;
const level = [ [2, 1, 1],
				[1, 1, 2],
				[1, 1, 2]
			  ];
const directionMatrix = [-1,1,1,-1];

board = [[],[],[]];

let row_displaced = 0;
let column_displaced = 0;

let node = {
	row : -1,
	column : -1,
	value : 0,
	visited : false,
	targets : [],
	lastTargetDirection : 0
}

let buildNode = (row, col, val) => {
	let tempNode = { ... node }
	tempNode.row = row;
	tempNode.column = col;
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

board = buildBoard();
displayBoard(board);

/*
let addTargets = () => {
	for(let row=0; row < boardSize; row++) {
		for (let column=0; column<boardSize; column++ ) {
			for (let i = 0; i<numPolySides; i++) {
			}
		}
	}
}
let displayTargets = () => {
	for (let row=0; row < boardSize; row++){
		for (let column=0; column<boardSize; column++){
			for(let i = 0; i < numPolySides; i++){
				console.log(`board [${row}][${column}] | Target [${i}] : [${board[row][column].targets[i].row}][${board[row][column].targets[i].column}]`);
			}
		}
	}
}
*/
