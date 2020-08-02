



let playerTurnColorIndicator = "white";
let playerNotTurnColorIndicator = "rgb(173, 173, 193)";

let boardStatus = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 0 = empty | 1 = X | 2 = O
let winningPositions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];

let playerOneObj; 
let playerTwoObj; 

let filledPositionsCounter = 0; 


loadAppropriateFunctionsJs();



/**
 * Determines which functions to load given the current web page
 */

function loadAppropriateFunctionsJs()
{
    if(document.querySelector("body").classList.contains("playerScreen"))
    {
        loadUserScreenPageJs();

    }else if(document.querySelector("body").classList.contains("playGameScreen"))
    {   
        playerOneObj = JSON.parse(localStorage.getItem("playerOne"));
        playerTwoObj = JSON.parse(localStorage.getItem("playerTwo"));

        if(playerOneObj != null && playerTwoObj != null)
        {
            loadPlayGamePageJs();
        }else
        {
            // display a msg or redirect the user to login page 
        }
    }
}



function loadUserScreenPageJs()
{
    document.querySelector("#userOptions").addEventListener('submit', retrieveUserInfo); 
    radioButtonSetUp();
}

function loadPlayGamePageJs()
{
    setStartingTurn();
    changeBoardPlayerNames();
    setGameBoardBlocks();
    setPlayerWonOptionBtn();

}


////////////////////////// player screen option section ////////////////////////

/**
 * Creates a player object
 * @param {*} name  name given by user
 * @param {*} symbol user selected symbol
 */
const PlayerFactory = (name, symbol) =>
{
    return {name, symbol};
}


/**
 * Sets up event listeners for radio buttons
 */
function radioButtonSetUp()
{
    let radioButtonSymbols = Array.from(document.querySelectorAll(".radioSymbol"));

    for(let i = 0; i < radioButtonSymbols.length; i++)
    {
        radioButtonSymbols[i].addEventListener('click', checkRadioClicked);
    }
};


/**
 * 
 * Selects the opposite radio button ( x / O symbol) for the other player
 * insuring both players don't have the same symbol. 
 * 
 * @param {*} e 
 */
function checkRadioClicked(e)
{
    const playerOne = "playerOneSymbol";
    const playerTwo = "playerTwoSymbol";

    const xSymbol = "x"; 
    const oSymbol = "o" ;

     let event = e || window.event;  
     let target = e.target || e.srcElement;

     let playerSelected = target.name;
     let symbolSelected = target.value; 

     let oppsoitePlayerRadioBtnToSelect; 

     if(playerSelected == playerOne)
     {

        if(symbolSelected === xSymbol)
        {

            oppsoitePlayerRadioBtnToSelect = document.querySelector("#pTwoO");

        }else if (symbolSelected === oSymbol)
        {
            oppsoitePlayerRadioBtnToSelect = document.querySelector("#pTwoX");
        }

     }else if(playerSelected === playerTwo)
     {
        if(symbolSelected === xSymbol)
        {

            oppsoitePlayerRadioBtnToSelect = document.querySelector("#pOneO");

        }else if (symbolSelected === oSymbol)
        {
            oppsoitePlayerRadioBtnToSelect = document.querySelector("#pOneX");
        }
     }

     oppsoitePlayerRadioBtnToSelect.checked = true; 
}







/**
 * Retrieves the user inputed information and saves it to be used on play game page 
 */
function retrieveUserInfo()
{
    let playerOneName = document.querySelector("#playerOneUserSelectedName").value;
    let playerTwoName =  document.querySelector("#playerTwoUserSelectedName").value;

    let playerOneSymbol;
    let playerTwoSymbol; 

    if(document.querySelector("#pOneX").checked || document.querySelector("#pTwoO").checked)
    {
        playerOneSymbol = "X"; 
        playerTwoSymbol = "O"; 

    }else if(document.querySelector("#pOneO").checked || document.querySelector("#pTwoX").checked)
    {
        playerOneSymbol = "O"; 
        playerTwoSymbol = "X"; 
    }

    playerOneObj = PlayerFactory(playerOneName, playerOneSymbol);
    playerTwoObj = PlayerFactory(playerTwoName, playerTwoSymbol);

    localStorage.setItem('playerOne', JSON.stringify(playerOneObj)); 
    localStorage.setItem('playerTwo', JSON.stringify(playerTwoObj));
}










///////////////////////////////// play game screen section /////////////////////////////////

/**
*   Sets player one to start game 
*/
function setStartingTurn()
{
    document.querySelector("#playerOneInfo").firstElementChild.style.color = playerTurnColorIndicator;
    document.querySelector("#playerTwoInfo").firstElementChild.style.color = playerNotTurnColorIndicator;
}


/**
 *  Displays the names of the players on the game screen 
 */
function changeBoardPlayerNames()
{
    document.querySelector("#playerOneName").textContent = playerOneObj.name;
    document.querySelector("#playerTwoName").textContent = playerTwoObj.name;

    document.querySelector("#playerOneSymbol").textContent = playerOneObj.symbol;
    document.querySelector("#playerTwoSymbol").textContent = playerTwoObj.symbol;
}




/**
 * Sets each block in the board to call the appropriate method once clicked 
 */
function setGameBoardBlocks()
{
    let gameBlocks = Array.from(document.querySelectorAll(".boardPosition"));

    for(let i = 0; i < gameBlocks.length; i++)
    {
        gameBlocks[i].addEventListener('click', addSymbolInBlock);
    }
}




/**
 * Ads the correct symbol in the game board block and calls function to check for win 
 * @param {*} e event
 */

function addSymbolInBlock(e)
{
    let event = e || window.event;  
    let target = e.target || e.srcElement;

    if (target.textContent === "")
    {
        if(document.querySelector("#playerOneInfo").firstElementChild.style.color === playerTurnColorIndicator)
        {
            target.textContent = playerOneObj.symbol;
            document.querySelector("#playerOneInfo").firstElementChild.style.color = playerNotTurnColorIndicator; 
            document.querySelector("#playerTwoInfo").firstElementChild.style.color = playerTurnColorIndicator;
            addSymbolInArray(target.id, playerOneObj.symbol);
        }else
        {
            target.textContent = playerTwoObj.symbol;
            document.querySelector("#playerOneInfo").firstElementChild.style.color = playerTurnColorIndicator; 
            document.querySelector("#playerTwoInfo").firstElementChild.style.color = playerNotTurnColorIndicator;
            addSymbolInArray(target.id, playerTwoObj.symbol);
        }

        checkWin();
    }
}




/**
 *  Ads the symbol placed in a game board block to the internal representation of the game 
 * 
 *  empty block is represented by the number 0 
 *  x is represented by the number 1 
 *  o is represented by the number 2 
 * 
 * @param {*} blockId id of block where the symbol was placed 
 * @param {*} symbol symbol to be placed 
 */
function addSymbolInArray(blockId, symbol)
{   
    let numberSymbol = 0; 


    if (symbol == "X")
    {
        numberSymbol = 1;  
    }else
    {
        numberSymbol = 2; 
    }

    // ID : Array Position 
    let boardPositionTranslation = 
    {
        "positionOne":    0, 
        "positionTwo":    1, 
        "positionThree":  2, 
        "positionFour":   3, 
        "positionFive":   4, 
        "positionSix":    5, 
        "positionSeven":  6, 
        "positionEight":  7, 
        "positionNine":   8, 
    };

    boardStatus[boardPositionTranslation[blockId]] = numberSymbol;
}


/**
 * Checks to see if the player won or if it is a draw 
 */
function checkWin()
{

    let winningSymbol; 
    let won = false; 
    
    let xSymbol = 1; 
    let oSymbol = 2; 

    filledPositionsCounter++;

    for(let boardOriantation = 0; boardOriantation <  winningPositions.length; boardOriantation++)
    {
        let positionOne = winningPositions[boardOriantation][0];
        let positionTwo = winningPositions[boardOriantation][1];
        let positionThree = winningPositions[boardOriantation][2];

        if (boardStatus[positionOne] != 0)
        {
            if(boardStatus[positionOne] == boardStatus[positionTwo] &&  boardStatus[positionTwo] == boardStatus[positionThree])
            {
                won = true; 

                if(boardStatus[positionOne] === xSymbol)
                {
                    winningSymbol = "X";
                }else
                {
                    winningSymbol = "O";
                }
            }
        }
    }

    if(won)
    {
        playerWon(winningSymbol);
        filledPositionsCounter = 0; 
        
    }else if (filledPositionsCounter === 9)
    {
        filledPositionsCounter = 0; 
        tie();
    }
}



/**
 * Displays a message if a player won the game 
 * @param {*} symbol winning player symbol 
 */

function playerWon(symbol)
{
    document.querySelector(".youWonContainer").style.display = "flex";

    if(playerOneObj.symbol === symbol)
    {

         document.querySelector(".playerName").textContent = playerOneObj.name;
    }else
    {
        document.querySelector(".playerName").textContent = playerTwoObj.name;
    }

}



/**
 * Displays a message if a tied occured 
 */
function tie()
{
    document.querySelector(".youWonContainer").style.display = "flex";
    document.querySelector(".playerName").textContent = ""
    document.querySelector(".winStatus").textContent = "Tie!"
}


/**
 * Resets the game
 */
function resetGameBoard()
{
    let boardBlocks = Array.from(document.querySelectorAll(".boardPosition"));


    // Reset board array internal representation 
    for(let i = 0; i < boardStatus.length; i++)
    {
        boardStatus[i] = 0; // 0 empty block 
    }


    // reset board in browsers 
    for(let i = 0; i < boardBlocks.length; i++)
    {
        boardBlocks[i].textContent = "";
    }

    document.querySelector(".youWonContainer").style.display = "none";
    document.querySelector("#playerOneInfo").firstElementChild.style.color = playerTurnColorIndicator;
    document.querySelector("#playerTwoInfo").firstElementChild.style.color = playerNotTurnColorIndicator;
}


/**
 * sets the buttons for the player won screen
 */
function setPlayerWonOptionBtn()
{
    document.querySelector("#youWonRestartGameBtn").addEventListener("click", resetGameBoard);
}



