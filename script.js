let turnColorIndicator = "white";
let notTurnColorIndicator = "rgb(173, 173, 193)";

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
        }else
        {
            target.textContent = playerTwoObj.symbol;
            document.querySelector("#playerOneInfo").firstElementChild.style.color = turnColorIndicator; 
            document.querySelector("#playerTwoInfo").firstElementChild.style.color = notTurnColorIndicator;
        }
    }
}












