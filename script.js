let slots = document.querySelectorAll('.slot');
let rowSize = 3;
pageSetUp(rowSize);
let game = createNewGame('Jerry', 'Bob', rowSize);

function pageSetUp(rowSize = 3){
    boardSetup(rowSize);
    // loadGameState(rowSize);
}

function boardSetup(rowSize = 3){
    let gameDiv = document.querySelector('.game');
    
    for (let i = 0; i < rowSize*rowSize; i++){
        let newButton = document.createElement("div");
        let slotNum = i;
        let rowNum = slotNum % 3;
        let colNum = Math.floor(slotNum / 3);

        newButton.id = "slot-" + i;
        newButton.classList.add('slot');

        newButton.classList.add('R'+rowNum);
        newButton.classList.add('C'+colNum);
        if ((i/4) === Math.floor(i/4)){
            newButton.classList.add('D1');
        }
        if ((i/2) >= 1 && (i/2) <= 3 && (i/2) === Math.floor(i/4)){
            newButton.classList.add('D2');
        }
        
        newButton.addEventListener('click', (event) =>{
            const target = event.target;
            // 0 1 2
            // 3 4 5
            // 6 7 8
            
            target.textContent = game.takeTurn(colNum, rowNum);
        });
        gameDiv.appendChild(newButton);
    }
}

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
                    // alert(res + ' wins!');
                }

                // swap players
                if (this.currentPlayer == this.playerOne) {
                    this.currentPlayer = this.playerTwo;
                } else {
                    this.currentPlayer = this.playerOne;
                }
                this.displayBoard();
                return this.board[x][y];
            } else {
                alert('You cannot play into an occupied slot!');
                return currentSlot;
            }
            
        },
        selectWinningSlots(winningSlots){
            console.log('attempt to select' + winningSlots);
            let winners = document.querySelectorAll("."+winningSlots);

            winners.forEach(element => {
                element.classList.add('flashing');
            });

            this.createNewRoundButton();
        },
        createNewRoundButton(){
            let newRoundButton = document.createElement('button');
            newRoundButton.id = 'new-round';
            newRoundButton.textContent = "NEW ROUND";
            const scoreboard = document.querySelector(".score-board");
            scoreboard.appendChild(newRoundButton);
        },
        resetBoard(){
            this.board = new Array(rowSize).fill("").map(() => new Array(rowSize).fill(""));
            const slots = document.querySelectorAll('.slot');
            slots.forEach(element => element.textContent = '');
            const flashing = document.querySelectorAll('.flashing');
            flashing.forEach(element => element.classList.remove('flashing'));
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
                        console.log('triggered by diag');
                        return check;
                    }
                } else {
                    console.log('triggered by col');
                    return check;
                }
            } else {
                console.log('triggered by row');
                return check;
            }
        },
        rowCheck(arr){
            for (let i = 0; i < arr.length; i++){
                const row = arr[i];
                console.log('reading ROW: ' + i + ": " + row);
                const firstValue = row[0];
                if (row.every(entry => entry === firstValue) && firstValue != ''){
                    console.log('Returning: ' + firstValue );
                    this.selectWinningSlots('C'+i);
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
                    this.selectWinningSlots('R'+i);
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
                this.selectWinningSlots('D1');
                return firstValue;
            }

            firstValue = diagonalTwo[0];
            if (diagonalTwo.every(entry => entry === firstValue) && firstValue != ''){
                this.selectWinningSlots('D2');
                return firstValue;
            }
            return '';
        },
        fullCheck(arr){
            for (let i = 0; i < arr.length; i++){
                for (let j = 0; j < arr[i].length; j++){
                    if (arr[i][j] == ''){
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

