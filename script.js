let gameController = createNewGame();

function createNewGame(p1, p2, rowSize){
    let playerOne = createNewPlayer(p1, 'X');
    let playerTwo = createNewPlayer(p2, 'O');
    
    let game = {
        playerOne: playerOne,
        playerTwo: playerTwo,
        board: new Array(rowSize).fill("").map(() => new Array(rowSize).fill("")),
        currentPlayer: playerOne,

        incrementScore(num){
            switch (num){
                case 1:
                    score[0]++;
                    break;
                case 2:
                    score[1]++;
                    break;
                default:
                    alert('Please input value 1 or 2');
            }
        },

        takeTurn(x, y){
            let currentSlot = this.board[x][y];
            if (currentSlot == ''){
                this.board[x][y] = this.currentPlayer.getMarker();
                
                const res = this.evaluateBoard();
                if (res != '') {
                    alert(res + ' wins!');
                }

                // swap players
                if (this.currentPlayer == this.playerOne) {
                    this.currentPlayer = this.playerTwo;
                } else {
                    this.currentPlayer = this.playerOne;
                }
                this.displayBoard();
            } else {
                alert('You cannot play into an occupied slot!');
            }
            
        },
        resetBoard(){
            board = [];
        },
        resetScores(){
            score = [0,0];
        },
        evaluateBoard(){
            console.log('Evaluating board.');
            let check = '';
            check = this.rowCheck(this.board);
            if (check == ''){
                check = this.columnCheck(this.board);
                if (check == ''){
                    check = this.diagonalCheck(this.board);
                    if (check == ''){
                        check = this.fullCheck(this.board);
                        if (check) {
                            return "full";
                        }
                        return '';
                    } else {
                        return check;
                    }
                } else {
                    return check;
                }
            } else {
                return check;
            }
        },
        rowCheck(arr){
            for (let i = 0; i < arr.length; i++){
                const row = arr[i];
                const firstValue = row[0];
                if (row.every(entry => entry === firstValue) && firstValue != ''){
                    return firstValue;
                }
            }
            return '';
        },
        columnCheck(arr){
            for (let i = 0; i < arr.length; i++){
                let col = [];
                for (let j = 0; j < arr[i].length; j++){
                    col.push(arr[j][i]);
                }
                const firstValue = col[0];
                if (col.every(entry => entry === firstValue) && firstValue != ''){
                    return firstValue; // return the marker
                }
            }
            return '';
        },
        diagonalCheck(arr){
            let diagonalOne = [];
            let diagonalTwo = [];
            for (let i = 0; i < arr.length; i++){
                diagonalOne.push(arr[i][i]);
                diagonalTwo.push(arr[arr.length - i - 1][i]);
            }

            let firstValue = diagonalOne[0];
            if (diagonalOne.every(entry => entry === firstValue) && firstValue != ''){
                return firstValue;
            }

            firstValue = diagonalTwo[0];
            if (diagonalTwo.every(entry => entry === firstValue) && firstValue != ''){
                return firstValue;
            }
            return '';
        },
        fullCheck(arr){
            for (let i = 0; i < arr.length; i++){
                for (let j = 0; j < arr[i].length; j++){
                    if (arr[i][j] == ' '){
                        return false; // not full
                    }
                }
            }
            return true;
        },
        
        displayBoard(){
            console.log('Displaying board:');
            for (let i = 0; i < this.board.length; i++){
                let rowStr = '';
                for (let j = 0; j < this.board.length; j++){
                    rowStr += this.board[i][j] + " ";
                }
                console.log(rowStr);
            }
        }
    }
    return game;
}

function createNewPlayer(name, marker){
    let player = {
        name: name,
        marker: marker,
        getMarker(){
            return this.marker;
        }
    };
    return player;
}

