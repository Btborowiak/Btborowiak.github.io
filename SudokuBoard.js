const NO_SOLUTION = 'NO SOLUTION';

function validateCharacter(id, value){
    if (isNaN(value) || value == ' '){
        document.getElementById(id).value = '';
    }
}

function solve(){
    const board = getBoard();
    let result = solveSpot(board, 0,  0);

    if (result == NO_SOLUTION){
        alert('There is no solution to this puzzle');
    } else {
        setBoard(board);
    }
}

function solveSpot(board, row, col){
    console.log('Solving index (' + row + ', ' + col + ')');
    if (board[row][col] != 0){
        return solveNextSpot(board, row, col);
    }

    let availNums = getAvailableNumbers(board, row, col);

    for (let i = 0; i < availNums.length;  i++){
        board[row][col] = availNums[i] + '';

        if (row == 8 && col == 8){
            return board;
        } else {
            let result = solveNextSpot(board, row, col);

            if (result == NO_SOLUTION){
                continue;
            } else {
                return result;
            }
        }
    }

    board[row][col] = 0;
    return NO_SOLUTION;
}

function solveNextSpot(board, row, col){
    const nextRow = (col == 8) ? row + 1 : row;
    const nextCol = (col == 8) ? 0 : col + 1;

    // If the last spot in the grid was a prefilled value, return the board as a solution
    if (nextRow == 9){
        return board;
    }

    return solveSpot(board, nextRow, nextCol);
}

function getAvailableNumbers(board, row, col){
    let foundNums = [];
    
    // get numbers from row
    for (let i = 0; i < 9; i++){
        if(board[row][i] != 0){
            foundNums.push(board[row][i]);
        }
    }

    // get numbers from col
    for (let i = 0; i < 9; i++){
        if (board[i][col] != 0){
            foundNums.push(board[i][col]);
        }
    }

    // get numbers from 3x3 grid
    const gridOffsetY = row - (row % 3);
    const gridOffsetX = col - (col % 3);
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            let y = i + gridOffsetY;
            let x = j + gridOffsetX;
            if (board[y][x] != 0){
                foundNums.push(board[y][x]);
            }
        }
    }

    return ['1','2','3','4','5','6','7','8','9'].filter((num) => {
        return !foundNums.includes(num + '');
    });
}

function getBoard(){
    let board = initializeBoard();
    const inputs = document.querySelectorAll('input');
    for (const input of inputs){
        let indices = input.id.split(',');
        board[indices[0]][indices[1]] = input.value;
    }
    return board;
}

function setBoard(board){
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            let input = document.getElementById(i + ',' + j);
            input.value = board[i][j];
        }
    }
}

  function initializeBoard(){
    return [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
}