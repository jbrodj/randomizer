//============== PAGE CONTENT ELEMENT VARIABLES================

// Elements from initial input form to select which game is being played
const toggleForm = document.getElementById('toggleForm')
const toggleDisplay = document.getElementById('toggleDisplay')
const toggleButton = document.getElementById('toggleSubmit')
const promptHeading = document.getElementById('promptHeading')
const defaultSelectRadio = document.getElementById('randomRadio')

// Elements from input form for gathering number of players
const numForm = document.getElementById('numForm')
const numInput = document.getElementById('numInput')
const numButton = document.getElementById('numSubmit')

// Elements from input form for gathering player names
const nameForm = document.getElementById('nameForm')
const nameButton = document.getElementById('nameSubmit')

// Elements for displaying final results
const resultSection = document.getElementById('resultSection')

const resetButton = document.getElementById('resetButton')



// ================= USER CHOOSES WHICH GAME THEY'RE PLAYING =====================

// When page loads or refreshes, reset html element to default selection - prevents radio selection display from sticking on refresh.
defaultSelectRadio.checked=true

// Variable to store input value for the selected game
let gameSelected = 'whiteElephant'

// Listen for change on the game selection form
toggleForm.addEventListener('change', setToggleSelect)

// Set the gameSelect variable to user selection
function setToggleSelect(event) {
    gameSelected = event.target.value
    if (gameSelected === 'secretSanta') {
        toggleDisplay.textContent = 'Secret Santa'
    } else {
        toggleDisplay.textContent = 'White Elephant'
    }
}

// Listen for submit of radio toggle form (toggleForm)
toggleForm.addEventListener('submit', submitToggleForm)

// When submit clicked, hide toggle form, update heading text, check for which game is selected, and launch next step for that game
function submitToggleForm(event) {
    event.preventDefault()
    toggleForm.classList.add('inactive')
    toggleButton.classList.add('inactive')
    promptHeading.innerText = `Let's put players in a random order!`
    
    // Display form for number of players (numForm)
    numForm.classList.remove('inactive')
    numButton.classList.remove('inactive')

    // Display reset button 
    resetButton.classList.remove('inactive')

    // Focus on number input
    numInput.focus()
}


// ================== MAIN PROGRAM SEQUENCE ====================

// Variable to store input value for the number of players text field.
let numPlayers = parseInt(numInput.value)

// Listen for change on number of players input (numInput)
numInput.addEventListener('change', assignNum)

// Set value of numPlayers = integer input value
function assignNum(event) {
    numPlayers = parseInt(event.target.value)
}

// Declare arrays to store user data
let numArray = []
let nameArray = []

// Listen for submit event on number form. 
numForm.addEventListener('submit', submitNumForm)

// When form is submitted, send numPlayers value, clean up form elements, and call next function. 
function submitNumForm(event) {
    event.preventDefault()
    // Populate empty array with a number of items = the numPlayers value
    numArray = []
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

// Generate a form with # inputs === integer selected in the number form:
function generateNamesForm() {
    // Update prompt heading for next step.
    document.querySelector('h2').innerText = `Let's gather all the names`;

    // Iterate through number array and create input/label inside a LI for each array index and give them values/attributes from element parameter. 
    numArray.forEach(function(element) {
        // Stringify the value of each element. 
        string = element.toString()
        // Create & append LI. Add attributes for styling.
        const inputLi = document.createElement('li')
        inputContainer2.appendChild(inputLi)
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

// Define array for storing name data from user inputs
nouveauArray = []
// Listen for second form submit click.
nameForm.addEventListener('submit', submitNameForm)
// When name form submits, call appropriate program function & store name values in new array. 
function submitNameForm(event) {
    event.preventDefault()

    // Array to store temporary name data
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
const randomOrder = []

// Function to randomize the order of the list of names
function randomatron2000() {
    // Loop to generate random number, add item at that index to randomOrder array, and remove it from array of names for each index in the array.
    while (nouveauArray.length > 0) {
        rando = Math.floor(Math.random() * nouveauArray.length)
        randomOrder.push(nouveauArray[rando])
        nouveauArray.splice(rando, 1)
    }
    // Call the print function
    printResults()
}


// =================== SECRET SANTA PROGRAM =======================

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


function pairamatron2001() {
    console.log('pairamatronnnnnn')
}





// =============== PRINTING RESULTS ==================

// Send final results to the OL on the page, creating an li for each index in the randomized array.
function printResults() {
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


// ================= RESET FUNCTION ===================

// Event Listener for reset button
resetButton.addEventListener('click', formReset)

// When button pressed, show initial page loadout.
function formReset() {

    // Reset prompt h2 element text. 
    promptHeading.innerText = 'Which game are you playing?'
    
    // Array containing elements to be displayed
    const toReset = [toggleForm, toggleDisplay, toggleButton]
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
}