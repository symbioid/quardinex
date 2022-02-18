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
	let tempNode = { ... node }
	tempNode.row = row;
	tempNode.col = col;
	tempNode.value = val;
	return tempNode;
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
			// console.log(`Board[${row}][${col}] =  ${board[row][col].value}`);
			for (i = 0; i < numPolySides; i++) {
				if(i % 2 == 0) {
					// console.log(`directionMatrix: ${directionMatrix[i]}`);
					targetRow = row + (board[row][col].value * directionMatrix[i]);
					targetCol = col;
				} else {
					// console.log(`directionMatrix: ${directionMatrix[i]}`);
					targetRow = row;
					targetCol = col + (board[row][col].value * directionMatrix[i]);
				}
				// console.log(`TARGET [${i}] ACQUIRED: [${targetRow}][${targetCol}]`);

				//------bounds checking - any target whose (row | col) (< 0 | >boardsize) get set "NULL"
                if ((targetRow < 0 || targetRow>= boardSize) || (targetCol < 0  || targetCol >=  boardSize)) {
					board[row][col].targets[i] = null;
					console.log("null ",board[row][col].targets[i],row,col,i)
					//	console.log(`[${targetRow}][${targetCol}] ASSIGNING TARGET[${i}] = [NULL] // (Out Of Bounds)`)
				}
				else {
					//
					let poop = {
						row: board[targetRow][targetCol].row,
						col: board[targetRow][targetCol].col,
						value: board[targetRow][targetCol].value,
					}
					board[row][col].targets[i] = poop;
			//		board[row][col].targets[i] = {value:board[targetRow][targetCol].value}; <-- WORKS-ISH
			//		console.log(poop)
					console.log("undefined ", board[row][col].targets[i],row,col,i)
					//board[row][col].targets[i] = Object.assign({},board[targetRow][targetCol]);
					// console.log(`[${targetRow}][${targetCol}] ASSIGNING TARGET[${i}] = [${targetRow}][${targetCol}]`)
				}
			}
			//console.log(board[row][col]);
			console.log("-");
		}
		console.log("-")
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
setTimeout(()=>console.log(board),10000);

