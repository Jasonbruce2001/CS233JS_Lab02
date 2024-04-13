// Create a class called StopWatch.
class StopWatch{
    /*
        Add a constructor.  In the body of the constructor
        -   Create instance variables for the 3 global 3 variables as well
            as all of the elements on the page that you're going to
            refer to in code
        -   All of the functionality of init will happen in the constructor.
        -   Add the event handlers for the start, stop and reset buttons.
            You'll have to bind(this) to each function because the keyword
            this will refer to the button (not the class) when the 
            event fires
            -- this.startButton.onclick = this.startTimer.bind(this);
    */
    constructor(){
        //instance variables
        this.isRunning = false;
        this.timer = null;
        this.elapsedTime = 0;
        this.startButton = document.querySelector('#start');
        this.stopButton = document.querySelector('#stop');
        this.resetButton = document.querySelector('#reset');


        //bind onclick events
        this.startButton.onclick = this.startTimer.bind(this);
        this.stopButton.onclick = this.stopTimer.bind(this);
        this.resetButton.onclick = this.resetTimer.bind(this);
        this.incrementTimer = this.incrementTimer.bind(this);
        this.pad = this.pad.bind(this);
    }

    startTimer() {
        // if the timer is NOT running, start it by

        if(!this.isRunning)
        {
            // set the isRunning variable to true
            this.isRunning = true;

            // call the function setInterval to call the function incrementTimer every second
            // save the timer in a the timer variable so you can stop the timer later on
            this.timer = setInterval(this.incrementTimer, 1000);
        }
    }

    incrementTimer() {
        const SEC_IN_MIN = 60;
        let minutes, seconds = 0;

        // increment the elapsedTime
        this.elapsedTime++;

        // calculate the number of minutes and seconds by
        // minutes = the integer portion of (elapsedTime / 60)
        minutes = Math.floor(this.elapsedTime / SEC_IN_MIN);

        // seconds = the remainder when dividing elapsedTime by 60
        seconds = this.elapsedTime % SEC_IN_MIN;

        // call the function pad to make sure there's a leading 0 on minutes if necessary
        minutes = this.pad(minutes);

        // call the function pad to make sure there's a leading 0 on seconds if necessary
        seconds = this.pad(seconds);

        // write minutes to the element on the page
        document.getElementById("minutes").innerHTML = String(minutes);

        // write second to the element on the page
        document.getElementById("seconds").innerHTML = String(seconds);
    }

    pad(number) {
        if(number < 10){
            return "" + 0 + number;
        } else {
            return number;
        }
    }

    stopTimer() {

    if(this.isRunning)
        {
            this.isRunning = false;
            clearInterval(this.timer);
        }
    }

    resetTimer() {
        // stop the timer by calling stopTimer
        this.stopTimer();
        // set the elapsedTime back to 0
        this.elapsedTime = 0;

        // write 00 to the elements on the page for minutes and seconds
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
    }
}


// create a variable called stopWatch
// Add an event handler to the load event of the window. 
// Use an anonymous function or an arrow function to
// set the stopWatch variable to an instance of StopWatch
let stopWatch = new StopWatch();
document.onload = () => {
    
}

