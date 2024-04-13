// Create a class called TTT
class TTT
{
    /*
        Add a constructor that 
        -   defines and initializes all variables
        -   binds the keyword this to the class for each function because
            this will otherwise will refer to the clicked square
            -   this.calculateWinner = this.calculateWinner.bind(this);
            -   DON'T bind this for handleClick at this point
        -   calls the init method
    */
    constructor() {
        this.NUM_SQUARES = 9;
        // start with these global variables
        // is x the next player.  x plays first so it is initialized to true
        this.xIsNext = true;
        // this is the data for the game NOT the UI elements
        this.squares = Array(9).fill(null);
        // these 2 keep track of who wins and where on the board the win occurs
        this.winner = null;
        this.winningLine = Array();
            // all of the possible ways to win
        this.lines = [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6],
                    ];
        //call methods
        this.init();
   } //end constructor

    /*
        Convert each function to a method
        -   move it inside the class
        -   remove the keyword function
        -   add this to all of the variables that belong to the class
        -   change var to let or const for local variables
        -   add this to all method calls
     
        Init
        -   bind both this and i to handleClick
            -   this.handleClick.bind(this, i);
    */  

    init()
    {
        // create a variable called uiSquares that references all of the elements whose name is square
        let uiSquares = document.getElementsByName('square');
    
        // create a for loop to iterate through each element in uiSquares
        for(let i = 0; i < this.NUM_SQUARES; i++){
            // set the onclick property for the current uiSquare to handleClick
            uiSquares[i].onclick = this.handleClick.bind(this, i);
        }
    } //end init

    /*
        CalculateWinner
        -   use destructuring assingment to assign values to
            a b and c in one line
    */
    calculateWinner() {
        for (var i = 0; i < this.lines.length; i++) {
            var a = this.lines[i][0];
            var b = this.lines[i][1];
            var c = this.lines[i][2];       
            if (this.squares[a] && 
            this.squares[a] === this.squares[b] && 
            this.squares[a] === this.squares[c]) {
                this.winner = this.squares[a];
                this.winningLine = this.lines[i];
                return true;
            }
        }
        this.winner = null;
        this.winningLine = Array();
        return false;
    }      
    /*
        HandleClick
        -   add a parameter i rather than getting i from this
            -   this now refers to the class not the square
        -   remove the local variable i
        -   add a local variable to refer to the clicked square
            -   remember that squares have an integer id 0 - 8
    */
    handleClick(index) {
        console.log("square " + index + " clicked");
 
        // create a local variable called player and set it to either "X" or "O" using the variable xIsNext
        // Update the variable xIsNext to the "opposite" boolean value
        let player = "";
        if(this.xIsNext){
            player = "X";
            this.xIsNext = false;
        } else {
            player = "Y";
            this.xIsNext = true;
        }
    
        // Set the element in the squares array at index to the player's symbol.
        // Update the inner html for the square in the UI to the player's symbol too
        this.squares[index] = player;
        document.getElementById(index).innerHTML = player;
    
        // Set the onclick handler for this square in the UI to an empty anonymous function or arrow function
        document.getElementById(index).onclick = () => {};
    
        // If a call to calculateWinner returns true
            // highlight the winner and disable all of the squares
        // otherwise 
            //update the status in the UI to display the player
        if(this.calculateWinner()){
            this.highlightWinner();
        } else {
            if(this.xIsNext){
                player = "X";
            } else {
                player = "Y";
            }
            document.getElementById("status").innerHTML = "Next Player: " + player;
        }
    } //end handleClick

    highlightWinner() {
        console.log("winner has been selected");
        for(let i of this.winningLine){
            document.getElementById(i).style.backgroundColor = "red";
        }
        if(this.xIsNext){
            document.getElementById("status").innerHTML = "Player Y has won the game!";
        } else {
            document.getElementById("status").innerHTML = "Player X has won the game!";
        }
    
        this.disableAll();
    }//end highlightWinner

    disableAll() {

        // create a variable that stores all of the ui squares on the page
        let board = Array.from(document.getElementsByName("square"));
        // iterate through that array
        for(let i = 0; i < board.length; i++){
            // Set the onclick handler for a ui square to function that does nothing
            board[i].onclick = () => {};
        }
    } //end disableAll
} //end class


// declare a variable ttt
let ttt = new TTT();
// add an onload handler to the window that assigns ttt to a TTT
//document.onload = () => { ttt = new TTT(); }