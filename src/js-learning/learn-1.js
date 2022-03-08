const boardSize = 3;
const numPolySides = 4;

let targetRow = 0;
let targetCol = 0;

let allPaths = [];
let currentPath = [];


const level = [ [2, 1, 1],
				[1, 1, 2],
				[1, 1, 2]
			  ];
const directionMatrix = [-1,1,1,-1];  //(row,up-)(col,right+)(row,down+)(row,)

let board = [[],[],[]];

let node = {
	row : -1,
	col : -1,
	value : 0,
	visited : false,
	targets : [],
	mostRecentTargetIDX : 0
}

let buildNode = (row, col, val) => {
	return {
	  row : row,
	  col : col,
	  value : val,
	  visited : false,
	  targets : [],
	  targetIndex : 0
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

                if ((targetRow < 0 || targetRow>= boardSize) || (targetCol < 0  || targetCol >=  boardSize)) {
					board[row][col].targets[i] = null;
				}
				else {
                    board[row][col].targets[i] = board[targetRow][targetCol];
				}
			}
		}
	}
}
let showTargets = (node) =>{
	for(i=0;i<numPolySides;i++){
		if(node.targets[i] != null){
			console.log(`target ${i}: [${node.targets[i].row}][${node.targets[i].col}]`);
		}
		else {
			console.log("null",i);
		}
	}
}

let traverser = (node) => {
    currentNode = node;
    if(currentNode.visited == false){
        currentNode.visited = true;
        currentPath.push(currentNode);
    }
    for (i = 0; i < numPolySides; i++) {
        console.log(`${i}:`);
        if (i >= numPolySides){
            allPaths.push(currentPath);
            currentNode = prevNode;
            console.log(`x`);
        }
        else if (currentNode.targets[i] == null || currentNode.targets[i].visited == true){
            console.log("NO TARGET, EXIT TO NEXT LOOP ITER");
        }
        else if(currentNode.targets[i] != null && currentNode.targets[i].visited == false){
            prevNode = currentNode;
            currentNode = currentNode.targets[i];
            currentNode.visited = true;
            console.log(`MOVED TO [${currentNode.row}][${currentNode.col}], VALUE: ${currentNode.value}`);
            currentPath.push(currentNode);
            traverser(currentNode);
        }
    }
}
allPaths.push(currentPath);

board = buildBoard();
//console.log(board);
displayBoard(board);
addTargets(board);
//showTargets(board[0][0]);
walker = traverser(board[0][0]);
currentPath.forEach(e => {
    console.log(`[${e.row}][${e.col}]`);
})


for (i = 0; i < allPaths.length; i++){
    for( j = 0; j < allPaths[i].length; j++){
        console.log(`[${allPaths[i][j].row}][${allPaths[i][j].col}], VALUE: ${allPaths[i][j].value}`);
    }
}