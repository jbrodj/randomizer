//============== PAGE CONTENT ELEMENT VARIABLES================

// Elements from initial input form to select which game is being played
const toggleForm = document.getElementById('toggleForm')
// const toggleDisplay = document.getElementById('toggleDisplay')
const toggleButton = document.getElementById('toggleSubmit')
const promptHeading = document.getElementById('promptHeading')
const defaultSelectRadio = document.getElementById('whiteElephant')

// Elements from input form for gathering number of players
const numForm = document.getElementById('numForm')
const numInput = document.getElementById('numInput')
const numButton = document.getElementById('numSubmit')

// Elements from input form for gathering player names
const nameForm = document.getElementById('nameForm')
const nameInputContainer = document.getElementById('nameInputContainer')
const nameButton = document.getElementById('nameSubmit')

// Elements for displaying final results
const resultSection = document.getElementById('resultSection')

// Element for resetting the program
const resetButton = document.getElementById('resetButton')



// ================= USER CHOOSES WHICH GAME THEY'RE PLAYING =====================

// Variable to store input value for the selected game
let gameSelected = ''

// Listen for change on the game selection form
toggleForm.addEventListener('change', setToggleSelect)

// Set the gameSelect variable to user selection
function setToggleSelect(event) {
    gameSelected = event.target.value
    // ===== might still use this for contextual info about each game ====
    // if (gameSelected === 'secretSanta') {
    //     toggleDisplay.textContent = 'Secret Santa'
    // } else {
    //     toggleDisplay.textContent = 'White Elephant'
    // }
}

// Listen for submit of radio toggle form (toggleForm)
toggleForm.addEventListener('submit', submitToggleForm)

// When submit clicked, move to next step. 
function submitToggleForm(event) {
    event.preventDefault()

    // Update prompt heading for current step
    promptHeading.innerText = `Let's put players in a random order!`
    
    // Hide elements from the toggle form
    toggleForm.classList.add('inactive')
    toggleButton.classList.add('inactive')
    
    // Display form for number of players
    numForm.classList.remove('inactive')
    numButton.classList.remove('inactive')

    // Display reset button 
    resetButton.classList.remove('inactive')

    // Focus on number input
    numInput.focus()
}


// ================== MAIN PROGRAM SEQUENCE ====================

// Variable to store input value for the number of players text field.
let numPlayers

// Declare arrays to store user data
let numArray = []
let nameArray = []

// ===== USER CHOOSES WHICH GAME =====
// Listen for submit event on number form. 
numForm.addEventListener('submit', submitNumForm)

// When form is submitted, send numPlayers value, clean up form elements, and call next function. 
function submitNumForm(event) {
    event.preventDefault()

    // Reset number array value (in case app is run multiple times)
    numArray = []

    // Assign user input value to variable storing number of players
    numPlayers = numInput.value

    // Populate empty array with a number of items = the numPlayers value
    for (let i = 1; i <= numPlayers; i++) {
        numArray.push(`Player${i}`)
    }
    // Hide number form
    numForm.classList.add('inactive')
    numButton.classList.add('inactive')

    // Display names form
    nameForm.classList.remove('inactive')
    nameButton.classList.remove('inactive')

    // Call fn to display the names form
    generateNamesForm()
}

// ===== USER ADDS NAME DATA =====
// Generate a form with # inputs === integer selected in the number form:
function generateNamesForm() {

    // Clear generated child elements from the names input container.
    clearChildren(nameInputContainer)

    // Update prompt heading for next step.
    document.querySelector('h2').innerText = `Let's gather all the names`;

    // Iterate through number array and create input/label inside a LI for each array index and give them values/attributes from element parameter. 
    numArray.forEach(function(element) {
        // Stringify the value of each element. 
        string = element.toString()
        // Create & append LI. Add attributes for styling.
        const inputLi = document.createElement('li')
        nameInputContainer.appendChild(inputLi)
        inputLi.setAttribute('class', 'altColorLi')
        // Create label elements and name using numArray to link each to corresponding input element
        const label = document.createElement('label')
        label.innerText = string
        label.setAttribute('for', string)
        inputLi.appendChild(label)
        // Create & append input elements and add their properties
        const input = document.createElement('input')
        input.setAttribute('maxlength', '25')
        input.setAttribute('class', 'nameInput')
        input.setAttribute('id', string)
        // input.setAttribute('required', 'required')
        inputLi.appendChild(input)
        // Send Focus to first input
        document.getElementById('Player1').focus()
    })
}

// ===== STORE NAME DATA & MOVE ON TO GAME CHOSEN =====
// Define array for storing name data from user inputs
nouveauArray = []

// Listen for second form submit click.
nameForm.addEventListener('submit', submitNameForm)

// When name form submits, call appropriate program function & store name values in new array. 
function submitNameForm(event) {
    event.preventDefault()
    
    // Reset temporary name data array (in case app is run muliple times)
    nameArray = []

    // Variable to store the input elements in the names form 
    eachName = document.getElementsByClassName('nameInput')

    // Populate array with elements
    nameArray.push(eachName)

    // Loop through the nameArray to populate a new array with the user data from the inputs. 
    for (i = 0; i < nameArray[0].length; i++) {
        nouveauArray.push(nameArray[0][i].value)
    }

    // Hide names input form.
    nameForm.classList.add('inactive')
    nameButton.classList.add('inactive')

    if (gameSelected === 'whiteElephant') {
        // Update prompt heading for next step.
        promptHeading.innerText = `Here's the order!`;

        // Call the randomizer function. 
        randomatron2000()
    }

    if (gameSelected === 'secretSanta') {
        // Update prompt heading for next step.
        promptHeading.innerText = `Here are the pairings!`;

        // Call the pairing function.
        pairamatron2001()
    }
}


// =================== WHITE ELEPHANT PROGRAM ====================

// Define final array to store randomized name order.
let randomOrder = []

// Function to randomize the order of the list of names
function randomatron2000() {
    // Reset random order
    randomOrder = []
    // Loop to generate random number, add item at that index to randomOrder array, and remove it from array of names for each index in the array.
    while (nouveauArray.length > 0) {
        randomIndex = Math.floor(Math.random() * nouveauArray.length)
        randomOrder.push(nouveauArray[randomIndex])
        nouveauArray.splice(randomIndex, 1)
    }
    // Call the print function
    printResults()
}


// =================== SECRET SANTA PROGRAM =======================

function pairamatron2001() {
    console.log('pairamatronnnnnn')
    clearChildren(resultSection)
}

// Define final array to store the pairings
// const allPlayers = []
// let newBuddy = []

// allPlayers.push('Steve', 'Mary', 'Ron', 'Dawn', 'Shevon', 'Cmon')

// let currentPlayer;
// let otherPlayers = [];
// let takenPlayers = []
// let randomIndex;

// function numGenerator() {
//     randomIndex = Math.floor(Math.random() * (allPlayers.length - 1))
//     // console.log(randomIndex)
// }

// for (let p = 0; p < allPlayers.length; p++) {
//     // Find a random number to generate radom choice of player
//     numGenerator()

//     let possiblePairs = []

//     // Set the current player in the loop
//     currentPlayer = allPlayers[p]
//     // console.log(currentPlayer)

//     // Remove the player from their own list of possible matches
//     otherPlayers = allPlayers.filter(player => {
//         return player != currentPlayer
//     })
//     // console.log(otherPlayers)

//     if (takenPlayers.length > 0) {
//         let takenPlayerIndex = otherPlayers.indexOf(otherPlayers[randomIndex])
//         let takenPlayer = otherPlayers[takenPlayerIndex]
//         // console.log(takenPlayer)
//         for (n = 0; n < takenPlayers.length; n++)
//         possiblePairs = otherPlayers.filter(player => {
//             return player != takenPlayer
//         })
//         console.log(possiblePairs)
//     }

//     takenPlayers.push(otherPlayers[randomIndex])
//     console.log(takenPlayers)
//     }


// =============== PRINTING RESULTS ==================

// Send final results to the OL on the page, creating an li for each index in the randomized array.
function printResults() {

    // Clear generated child elements from the results section (start fresh if app runs multiple times)
    clearChildren(resultSection)

    // Display the results section
    resultSection.classList.remove('inactive')

    // Create and append the list items for each index, adding class property for styling. 
    randomOrder.forEach(function(item) {
        const listItem = document.createElement('li')
        listItem.classList.add('altColorLi')
        listItem.innerText = item
        resultSection.append(listItem)
    })
}


// =============== PARENT ELEMENT CLEANUP FUNCTION ================

// Clear generated child elements from the parent given. So parent starts fresh if app runs multiple times. 
function clearChildren(parentElement) {
    while(parentElement.firstChild) {
        parentElement.removeChild(parentElement.lastChild)
    }
}


// =================== RESET FUNCTION =====================

// Event Listener for reset button
resetButton.addEventListener('click', formReset)

// When button pressed, show initial page loadout, remove generated elements and variable values.
function formReset() {
    // Reset prompt h2 element text. 
    promptHeading.innerText = 'Which game are you playing?'
    
    // Array containing elements to be displayed
    const toReset = [toggleForm, toggleButton]

    // Remove 'inactive' class from each element
    toReset.forEach(resetToggleForm)
    function resetToggleForm(element) {
        element.classList.remove('inactive')
    }

    // Array containing elements to be hidden
    const toHide = [numForm, numButton, nameForm, nameButton, resultSection, resetButton]

    // Add 'inactive' class to each element
    toHide.forEach(hideForms)
    function hideForms(element) {
        element.classList.add('inactive')
    }

    // Bring focus to user's previous selection in the game selection toggle form (using gameSelected variable).
    document.getElementById(gameSelected).focus()
}

// Run reset function if escape key is pressed.
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        formReset()
    }
    
})