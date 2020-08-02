let turnColorIndicator = "white";
let notTurnColorIndicator = "rgb(173, 173, 193)";
let boardStatus = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let winningPositions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];


let playerOneObj; 
let playerTwoObj; 
let x = 0; 


if(document.querySelector("body").classList.contains("playerScreen"))
{
    x = 4; 
    loadUserScreenPageJs();

}else if (document.querySelector("body").classList.contains("playGameScreen"))
{   
    playerOneObj = JSON.parse(localStorage.getItem("playerOne"));
    playerTwoObj = JSON.parse(localStorage.getItem("playerTwo"));

    if(playerOneObj != null && playerTwoObj != null)
    {
        setStartingTurn();
        loadPlayGamePageJs();
        setGameBoardBlocks();
    }else
    {
        // display a msg or redirect the user to login page 
    }
    
}



function loadUserScreenPageJs()
{
    document.querySelector("#userOptions").addEventListener('submit', retrieveUserInfo);
    radioButtonSetUp();
}

function loadPlayGamePageJs()
{
    changeBoardPlayerNames();

}



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
 * Selects the opposite radio button (symbol) for the other player
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
 * checks to make sure input is filled 
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

function setStartingTurn()
{

    document.querySelector("#playerOneInfo").firstElementChild.style.color = turnColorIndicator;
    document.querySelector("#playerTwoInfo").firstElementChild.style.color = notTurnColorIndicator;
}


function changeBoardPlayerNames()
{
    document.querySelector("#playerOneName").textContent = playerOneObj.name;
    document.querySelector("#playerTwoName").textContent = playerTwoObj.name;

    document.querySelector("#playerOneSymbol").textContent = playerOneObj.symbol;
    document.querySelector("#playerTwoSymbol").textContent = playerTwoObj.symbol;
}


function setGameBoardBlocks()
{
    let gameBlocks = Array.from(document.querySelectorAll(".boardPosition"));

    for(let i = 0; i < gameBlocks.length; i++)
    {
        gameBlocks[i].addEventListener('click', addSymbolInBlock);
    }
}

function addSymbolInBlock(e)
{
    let event = e || window.event;  
    let target = e.target || e.srcElement;

    if (target.textContent === "")
    {
        if(document.querySelector("#playerOneInfo").firstElementChild.style.color === turnColorIndicator)
        {
            target.textContent = playerOneObj.symbol;
            document.querySelector("#playerOneInfo").firstElementChild.style.color = notTurnColorIndicator; 
            document.querySelector("#playerTwoInfo").firstElementChild.style.color = turnColorIndicator;
            addSymbolInArray(target.id, playerOneObj.symbol);

        }else
        {
            target.textContent = playerTwoObj.symbol;
            document.querySelector("#playerOneInfo").firstElementChild.style.color = turnColorIndicator; 
            document.querySelector("#playerTwoInfo").firstElementChild.style.color = notTurnColorIndicator;
            addSymbolInArray(target.id, playerTwoObj.symbol);

        }
    }
    checkWin();
}

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

function resetGameBoard()
{

}



function checkWin()
{
    let currentSymbol = 0; 
    const winingNumber = 3; 
    let won = false; 
    let xSymbol = 1; 
    let oSymbol = 2; 

    // O(1)

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
            }
        }
    }


    // Call the thing to stop the game 
    console.log(won);
}














