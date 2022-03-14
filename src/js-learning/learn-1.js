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
            //board[row][col].targets[i] = board[targetRow][targetCol];
            board[row][col].targets[i] = {
              row : board[targetRow][targetCol].row,
              col : board[targetRow][targetCol].col,
              value : board[targetRow][targetCol].value
            }
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
    console.log(node)
    let currentNode = node;
    let prevNode = currentNode;

    if(currentNode.visited === false){
         currentNode.visited = true;
         currentPath.push(currentNode);
    }
    for (var i =0; i <= numPolySides; i++) {
        //console.log(`${i}:`);
        if (i === numPolySides){
            allPaths.push(currentPath); // PROBLEM NEED TO BUILD WHATEVER THE FUCK IT IS I WANT. ARRAY OF ARRAYS. EACH COMPLETE PATH.
            if(currentPath.length === 1){
                return;
            }
            currentPath.pop(); //currentPath showing as "object typeof"
            currentNode = currentPath[currentPath.length-1];
            //console.log("Length", currentPath.length);
            console.log(`${i}:`, "Return");
            //console.log(currentNode);
            traverse(currentNode);
        }
        else if (currentNode.targets[i] == null || currentNode.targets[i].visited === true){
            console.log(`${i}:`, "No Target");
        }
        else if (currentNode.targets[i] != null && currentNode.targets[i].visited === false){
            prevNode = currentNode;
            currentNode = currentNode.targets[i];
            currentNode.visited = true;
            console.log(`${i}:`, `MOVED TO [${currentNode.row}][${currentNode.col}], VALUE: ${currentNode.value}`);
            currentPath.push(currentNode);
            traverse(currentNode);
        }
    }
}


const walkTo = (node)=> {
  if (!node.visited) {
    node.visited = true;
    currentPath.push({
      row: node.row,
      col: node.col,
      value: node.value
    });
    //currentPath.push(node);
  }

  for (let i=0; i<=numPolySides; i++) {
    let target = node.targets[i]

    if (i === numPolySides) {
      if (currentPath.length === 0) return;
      else allPaths.push(deepCopy(currentPath))
      //board[node.row][node.col].visited = false;
      currentPath.pop();
      let prevTarget = currentPath[currentPath.length-1];
      console.log(`${i}: All Targets Visited, Backup to [${prevTarget.row}][${prevTarget.col}]`);
      walkTo(board[prevTarget.row][prevTarget.col]);
    }
    else if (target && !board[target.row][target.col].visited) {
      console.log(`${i}: Target Not Yet Visited, Moving To [${target.row}][${target.col}], Value: ${target.value}`);
      walkTo(board[target.row][target.col]);
    }
    else {
      if (!target) {
        console.log(`${i}: Target Null [${node.row}][${node.col}]`);
      }
      else if (board[target.row][target.col].visited) {
        console.log(`${i}: Target Already Visited [${node.row}][${node.col}]`);
      }
    }
  }
}

//allPaths.push(currentPath);
//console.log(`CURPATH: ${allPaths}`);
board = buildBoard();

addTargets(board);
//displayBoard(board);
console.log(board);
//traverse(board[0][0]);
walkTo(board[0][0]);

/*
currentPath.forEach(e => {
    console.log(`[${e.row}][${e.col}]`);
})
*/

for (var i =0; i < allPaths.length; i++){
    console.table(allPaths[i])
    for( var j =0; j < allPaths[i].length; j++) {
        //console.log(`[${allPaths[i][j].row}][${allPaths[i][j].col}], VALUE: ${allPaths[i][j].value}`);

    }
}

console.log(allPaths)
