const boardSize = 3;
const numPolySides = 4;

let targetRow = 0;
let targetCol = 0;

let workingPath = [];
let allPaths = [];


const level = [ [2, 1, 1],
				[1, 1, 2],
				[1, 1, 2]
			  ];
const directionMatrix = [-1,1,1,-1];  //(row,up-)(col,right+)(row,down+)(row,)

board = [[],[],[]];

let node = {
	row : -1,
	col : -1,
	value : 0,
	visited : false,
	targets : []
}

let buildNode = (row, col, val) => {
	return {
	  row : row,
	  col : col,
	  value : val,
	  visited : false,
	  targets : []
	}
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
	return board;
}

let displayBoard = (board) => {
	console.log(`Displaying Board...`);
	for (row = 0; row < boardSize; row++){
		for(col = 0; col < boardSize; col++){
			console.log(`${board[row][col].value}`);
		}
	}
	console.log(`Board Built!`)
	console.log(`----------------------------------`)
}

let addTargets = (board) => {
	for(row=0; row < boardSize; row++) {
		for (col=0; col < boardSize; col++ ) {
			for (i = 0; i < numPolySides; i++) {
				if(i % 2 == 0) {
					targetRow = row + (board[row][col].value * directionMatrix[i]);
					targetCol = col;
				} else {
					targetRow = row;
					targetCol = col + (board[row][col].value * directionMatrix[i]);
				}
				//Bounds Check, if not in board, assign null, otherwise, assign new object
				//based on values calculated above.
                if ((targetRow < 0 || targetRow>= boardSize) || (targetCol < 0  || targetCol >=  boardSize)) {
					board[row][col].targets[i] = null;
					console.log("null ",board[row][col].targets[i],row,col,i)
				}
				else {
					let node = {
						row: board[targetRow][targetCol].row,
						col: board[targetRow][targetCol].col,
						value: board[targetRow][targetCol].value,
					}
					board[row][col].targets[i] = node;
					console.log("undefined ", board[row][col].targets[i],row,col,i)
				}
			}
		}
	}
}
showTargets = (node) =>{
	for(i=0;i<numPolySides;i++){
		if(node.targets[i] != null){
			console.log(`target ${i}: [${node.targets[i].row}][${node.targets[i].col}]`);
		}
		else {
			console.log("null",i);
		}
	}
}

board = buildBoard();
displayBoard(board);
addTargets(board);
