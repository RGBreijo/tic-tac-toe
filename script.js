


let playerOneObj; 
let playerTwoObj; 




document.querySelector("#userOptions").addEventListener('submit', retrieveUserInfo);

const PlayerFactory = (name, symbol) =>
{
    return {name, symbol};
}

radioButtonSetUp();



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
        playerOneSymbol = "x"; 
        playerTwoSymbol = "o"; 

    }else if(document.querySelector("#pOneO").checked || document.querySelector("#pTwoX").checked)
    {
        playerOneSymbol = "o"; 
        playerTwoSymbol = "x"; 
    }

    playerOneObj = PlayerFactory(playerOneName, playerOneSymbol);
    playerTwoObj = PlayerFactor(playerTwoName, playerTwoSymbol);

}







