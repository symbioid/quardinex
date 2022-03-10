const boardSize = 3;
const numPolySides = 4;

let targetRow = 0;
let targetCol = 0;

let allPaths = [];
let currentPath = [];

const deepCopy = (item) => {
    return JSON.parse(JSON.stringify(item));
}

const level = [ [2, 1, 1],
				[1, 1, 2],
				[1, 1, 2]
			  ];
const directionMatrix = [-1,1,1,-1];  //(row,up-)(col,right+)(row,down+)(row,)

let board = [[],[],[]];

let buildNode = (row, col, val) => {
	return {
	  row : row,
	  col : col,
	  value : val,
	  visited : false,
	  targets : [],
	  mostRecentTarget : 0
	}
  }

let getNode = (board, row, col) => {
	return board[row][col]
}

let buildBoard = () => {
	console.log(`Building Board \n...`)
	for(var row = 0; row < boardSize;row++){
		for(var col=0; col < boardSize; col++){
			let val = level[row][col];
			board[row][col] = buildNode(row,col,val);
		}
	}
	return board;
}

let displayBoard = (board) => {
	console.log(`Displaying Board...`);
	for (var row = 0; row < boardSize; row++){
		for(var col = 0; col < boardSize; col++){
			console.log(`${board[row][col].value}`);
		}
	}
	console.log(`Board Built!`)
	console.log(`----------------------------------`)
}

let addTargets = (board) => {
	for(var row = 0; row < boardSize; row++) {
		for (var col=0; col < boardSize; col++ ) {
			for (var i =0; i < numPolySides; i++) {
				if(i % 2 === 0) {
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
	for(var i = 0;i<numPolySides;i++){
		if(node.targets[i] != null){
			console.log(`target ${i}: [${node.targets[i].row}][${node.targets[i].col}]`);
		}
		else {
			console.log("null",i);
		}
	}
}

function traverse(node){
    let currentNode = node;
    let prevNode = currentNode;

    if(currentNode.visited === false){
         currentNode.visited = true;
         currentPath.push(currentNode);
    }
    for (var i =0; i <= numPolySides; i++) {
        console.log(`${i}:`);
        if (i === numPolySides){
            allPaths.push(currentPath); // PROBLEM NEED TO BUILD WHATEVER THE FUCK IT IS I WANT. ARRAY OF ARRAYS. EACH COMPLETE PATH.
            if(currentPath.length === 1){
                return;
            }
            currentPath.pop(); //currentPath showing as "object typeof"            
            currentNode = currentPath[currentPath.length-1];
            console.log("Length", currentPath.length);
            console.log(`TOSSER`);
            //console.log(currentNode);
            traverse(currentNode);
        }
        if (currentNode.targets[i] == null || currentNode.targets[i].visited === true){
            console.log("NO TARGET, EXIT TO NEXT LOOP ITER");
        }
        else if (currentNode.targets[i] != null && currentNode.targets[i].visited === false){
            prevNode = currentNode;
            currentNode = currentNode.targets[i];
            currentNode.visited = true;
            console.log(`MOVED TO [${currentNode.row}][${currentNode.col}], VALUE: ${currentNode.value}`);
            currentPath.push(currentNode);
            traverse(currentNode);
        }
    }
}


allPaths.push(currentPath);
console.log(`CURPATH: ${allPaths}`);
board = buildBoard();
displayBoard(board);
addTargets(board);
traverse(board[0][0]);

/*
currentPath.forEach(e => {
    console.log(`[${e.row}][${e.col}]`);
})
*/

for (var i =0; i < allPaths.length; i++){
    for( var j =0; j < allPaths[i].length; j++) {
        console.log(`[${allPaths[i][j].row}][${allPaths[i][j].col}], VALUE: ${allPaths[i][j].value}`);
    }
}

//console.log(allPaths)
