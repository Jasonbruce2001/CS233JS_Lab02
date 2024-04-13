// Create a class called Concentration.
class Concentration
{
    /*
        Add a constructor.  In the body of the constructor
        -   Create instance variables to replace the global variables
        -   Bind the class to each of the following methods
        -       this.showMatches = this.showMatches.bind(this);
        -       this.enableAllCards = this.enableAllCards.bind(this);
        -       this.enableAllRemainingCards = this.enableAllRemainingCards.bind(this);
        -       this.checkCards = this.checkCards.bind(this);
        -       this.disableAllCards = this.disableAllCards.bind(this);
        -       this.isMatch = this.isMatch.bind(this);     
        -   All of the functionality of init will happen in the constructor ... call init.
    */
    constructor() {
        this.IMAGE_PATH = 'Cards/';
        this.NUM_CARDS = 20;
        this.CARD_BACK = "Cards/CardBack.jpg";
        this.VALUE_POS = 4; //string index for value of a card

        // an array that stores the images for each card
        this.images = Array(19).fill(null);
        // the index of the first card picked by the user
        this.firstPick = -1;
        // the index of the second card picked by the user
        this.secondPick = -1;
        // statistics about this "round"
        this.matches = 0;
        this.tries = 0;

        //bind methods
        this.showMatches = this.showMatches.bind(this);
        this.enableAllCards = this.enableAllCards.bind(this);
        this.enableAllRemainingCards = this.enableAllRemainingCards.bind(this);
        this.checkCards = this.checkCards.bind(this);
        this.disableAllCards = this.disableAllCards.bind(this);
        this.isMatch = this.isMatch.bind(this);

        //call methods for start of game
        this.fillImages();
        this.shuffleImages();
        this.showMatches();
        this.enableAllRemainingCards();
        this.showAllBacks();
    }
    // shows the number of matches and tries in the status element on the page
    showMatches() {
        document.getElementById('status').innerHTML = "Matches: " + this.matches + " Tries: " + this.tries// update the element on the page to display the variable matches and tries
    }

    // fills the array images with 10 pairs of card filenames
    // card filenames follow this pattern:  cardvs.jpg where
    // v is the first char of the value of the card and 
    // s is the first char of the suit of the card
    // example:  cardjh.jpg is the jack of hearts
    fillImages() {
        let values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
        let suits = ['h', 's'];

        // create a variable called index and set it to 0
        let index = 0;

        // create a for loop that iterates through each value in the values array
        // create a for loop that iterates through each suit in the suits array
        for(let i = 0; i < values.length; i++)
        {
            for(let j = 0; j < suits.length; j++)
            {
                this.images[index] = "card" + values[i] + suits[j] + ".jpg"; // set the element in the images array at index to a string that contains card + value + suit + .jpg
                index++;                                                // increment the index
            }
        }
        // end for loop for the suits
        // end for loop for the values
    }

    // shuffles the elements in the images array
    shuffleImages() {
        console.log("shuffling");
        let temp = null;
        let randInt = 0;
        for(let i = 0; i < this.images.length; i++)
        {
            randInt = Math.floor(Math.random() * 19);
            temp = this.images[i] //store first index to be overwritten

            this.images[i] = this.images[randInt]; //replace index with randomly chosen index
            this.images[randInt] = temp; //place overwritten value at the new location
        }
    }

    // assigns the handleclick function to the onclick event for all cards
    // on the page.  All cards have the name attribute set to card.
    // It also sets the cursor (part of the style) to 'pointer'
    enableAllCards() {
        // create a variable called cards and set it equal to the elements on the page with a name of card
        let cards = document.getElementsByName("card");

        // create a for loop that iterates through cards
        for(i of cards){
            //set onclick and hover properties
            cards[i].onclick = this.handleClick.bind(this, i);
            cards[i].style.cursor = 'pointer';
        }
    }

    // enables (see enable all) only the cards whose backgroundImage
    // style property is not 'none'
    enableAllRemainingCards() {
        let cards = [];               // create a variable called cards and set it equal to the elements on the page with a name of card
        for(let i = 0; i < 20; i++)
        {
            cards[i] = document.getElementById(i);
        }

        for(let i = 0; i < 20; i++){                                // create a for loop that iterates through cards
            if(cards[i].style.backgroundImage != 'none'){           // if the style.backgroundImage of the current element in cards is not 'none'
                cards[i].onclick = this.handleClick.bind(this, i);  // set the onclick property for the current element in cards to handleClick
                cards[i].style.cursor = "pointer"                   // set the style.cursor to 'pointer' too
            }
        }
    }

    // shows the back of one card based on it's index
    // each card has an id attribute set to it's index in the html page
    // the backgroundImage (style) is set to the url of the image
    // for a card back to "show the back"
    showBack(index) {
        let card = document.getElementById(index);

        card.style.backgroundImage = `url(${this.CARD_BACK})`;
        // create a variable card and set it equal to the ui element with an id of index
        // set the style.backgroundImage of card to the filename for the back of a card
    }

    // shows the back for all cards
    // calls showBack in the body of a for loop
    showAllBacks() {
        // create a loop that iterates through indices 0 to 19
        for(let i = 0; i < this.NUM_CARDS; i++)
        {
            this.showBack(i);    // call the function showBack for the current index
        }
    }

    // this is the function that fires when the user clicks on a card
    handleClick(index) {
        console.log("card " + this.index);
        // declare cardImage and assign it to the image for this card
        let cardImage = this.IMAGE_PATH + this.images[index];

        // set the backgroundImage to the url of the cardImage
        console.log(cardImage);
        this.style.backgroundImage = `url(${cardImage})`;

        // disable the card 
        disableCard(index);

        if(this.firstPick != index){
            if(this.firstPick == -1){ //if first picked, set firstPick to index
                this.firstPick = index;
            } else {
                this.secondPick = index;                          //else set secondPick to index 
                this.disableAllCards();                           //disable all cards
                setTimeout(this.checkCards, 2000);
            }    
        }      
    }

    // disable one card based on it's index
    disableCard(index) {
        let card = document.getElementById(index);
        card.onclick = () => {}; 
        card.style.cursor = 'none';
    }

    // disable all of the cards
    disableAllCards() {
        for(i = 0; i < this.images.length; i++){
            this.disableCard(i);
        }
    }
    // END PART 2 - TEST TO HERE //

    // --------------------------------- PART 3 --------------------------------------- //
    // checks the 2 cards that have been picked for matches 
    checkCards() {
        // increment the number of tries
        this.tries++;

        // if the 2 cards match
        if(this.isMatch()){
            this.matches++; // increment the number of matches
            this.removeCard(this.firstPick);
            this.removeCard(this.secondPick);
        } else {
            this.showBack(this.firstPick);
            this.showBack(this.secondPick);
        }

        this.showMatches();           // update the matches and tries on the page
        this.firstPick = -1;          // reset the firstpick to -1
        this.secondPick = -1;         // reset the secondpick to -1

        this.enableAllRemainingCards();
    }

    // determines if the images in firstPick and secondPick are a matches
    // 2 cards are a match if they have the same value
    // cardvs.jpg is the pattern for card file names
    isMatch() {
        if((images[firstPick])[VALUE_POS] == (images[secondPick])[VALUE_POS]){
            return true;
        } else {
            return false;
        }
        
    }

    // removes one card from the board based on it's index
    // set the backgroundImage to 'none' to remove the card
    removeCard(index) {
        card = document.getElementById(index);
        card.style.backgroundImage = "none";
    }
        /*
            Convert each function to a method.  
            -   Move it inside the class.
            -   Remove the keyword function
            -   Add this. in front of every variable and method
            
            THREE OF THE METHODS CHANGE A LITTLE
            -   handleClick will now have a parameter, index
                -   remove the declaration / assignment of the local var index
            -   enableAllCards (and enableAllRemainingCards) have to pass the index to handleClick
                -   the line of code that calls bind must now pass both this and an index
                -   before: cards[i].onclick = this.handleClick.bind(this);
                -   should be: cards[i].onclick = this.handleClick.bind(this, i);
        */
    
}

// create a variable called concentration
let concentration;
// Add an event handler to the load event of the window. 
window.onload = () => { concentration = new Concentration(); }
// Use an anonymous function or an arrow function to
// set the concentration variable to an instance of Concentration




