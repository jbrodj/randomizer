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

// Descriptive text for each game.
const secretDesc = 'Each player is secretly assigned another player randomly and gives a gift to that player.';
const elephantDesc = 'Players choose gifts in order - taking one from the pile or stealing from another player.';

// toggleDisplay.textContent = ' '

// Check status of 'checked' on the toggle form inputs to set gameSelected to previously selected value, and set focus to that element - prevents an error when app is restarted by refresh instead of using the restart button.
if (toggleForm[1].checked === true) {
    gameSelected = 'whiteElephant';
    toggleForm[1].focus();
    toggleDisplay.textContent = elephantDesc;
} else if (toggleForm[2].checked === true) {
    gameSelected = 'secretSanta'
    toggleForm[2].focus()
    toggleDisplay.textContent = secretDesc;
}

// Listen for change on the game selection form
toggleForm.addEventListener('change', setToggleSelect)

// Set the gameSelect variable to user selection (and reset allPlayers array so names don't duplicate if user refreshes page instead of using reset button)
function setToggleSelect(event) {
    gameSelected = event.target.value
    allPlayers = []
    // ===== might still use this for contextual info about each game ====
    if (gameSelected === 'secretSanta') {
        toggleDisplay.textContent = secretDesc;
    } else {
        toggleDisplay.textContent = elephantDesc;
    }
}

// Listen for submit of radio toggle form (toggleForm)
toggleForm.addEventListener('submit', submitToggleForm)

// When submit clicked, move to next step. 
function submitToggleForm(event) {
    event.preventDefault()

    // Update prompt heading for current step
    promptHeading.innerText = `Let's randomize the list of players!`
    
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
        input.setAttribute('required', true)
        inputLi.appendChild(input)
        // Send Focus to first input
        document.getElementById('Player1').focus()
    })
}

// ===== STORE NAME DATA & MOVE ON TO GAME CHOSEN =====
// Define array for storing name data from user inputs
let allPlayers = []

// Listen for second form submit click.
nameForm.addEventListener('submit', submitNameForm)

// When name form submits, call appropriate program function & store name values in new array. 
function submitNameForm(event) {
    event.preventDefault()
    
    // Reset temporary name data and players array (in case app is run muliple times)
    nameArray = []
    allPlayers = []

    // Variable to store the input elements in the names form 
    eachName = document.getElementsByClassName('nameInput')

    // Populate array with elements
    nameArray.push(eachName)

    // Loop through the nameArray to populate a new array with the user data from the inputs. 
    for (i = 0; i < nameArray[0].length; i++) {
        allPlayers.push(nameArray[0][i].value)
    }

    // Once array of players is populated, check the array for any duplicate values.
    const hasDuplicate = allPlayers.some((value, index) => allPlayers.indexOf(value) !== index);
    // If array has any exact duplicates, stop the function, and tell the user to input unique values.
    if (hasDuplicate === true) {
        alert('Make sure each player has a unique name!')
        return
    }

    // Hide names input form.
    nameForm.classList.add('inactive')
    nameButton.classList.add('inactive')

    // Check which game is selected, and run the appropriate program. 
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
    while (allPlayers.length > 0) {
        randomIndex = Math.floor(Math.random() * allPlayers.length)
        randomOrder.push(allPlayers[randomIndex])
        allPlayers.splice(randomIndex, 1)
    }
    // Call the print function
    printResults(randomOrder)
}


// =================== SECRET SANTA PROGRAM =======================

// Initialize array to store pairing order
let pairedPlayers = []
// Initialize final array to store the pairings
let finalPairings = []
// Define variable to store a random number
let randomIndex;

//=== Random number generator ===
function numGenerator() {
    randomIndex = Math.floor(Math.random() * (allPlayers.length))
}

function pairamatron2001() {
        clearChildren(resultSection)
        
    // Reset paired players array and final pairings array (in case program runs more than once)
    pairedPlayers = []
    finalPairings = []
    // === Loop over all players and find a random non-self match ===
    for (let p = 0; p < allPlayers.length; p++) {
        // Find a random number to generate radom choice of player
        // Set the random index to an arbitrary non-index value to check for at the start of the loop
        randomIndex = -1;
        let runs = 0;
        
        // While randomIndex has that arbitrary value (ie. the loop hasn't run yet), or while the random index is the same as the index of the current player (so a player can't be assigned to themselves), or while the indexOf(randomIndex) is present in the pairedPlayers array (ie. that name already exists in the paired array, and person has already been paired), we want the random number generator to run and assign a value.
        while (randomIndex == -1 || randomIndex == p || pairedPlayers.indexOf(allPlayers[randomIndex]) != -1) {
            numGenerator()
            runs++;
            // If the program is running too many times, it's because the last value in the names list is the only available unpaired player. Start over. 
            if (runs > allPlayers.length) {
                pairamatron2001()
                return;
            }
        }
        pairedPlayers.push(allPlayers[randomIndex])
    }

    // Generate strings containing the pairings in a final array.
    for (i = 0; i < allPlayers.length; i++) {
        finalPairings.push(`${allPlayers[i]} buys for ${pairedPlayers[i]}`)
    }

    printResults(finalPairings)
}

// =============== PRINTING RESULTS ==================

// Send final results to the OL on the page, creating an li for each index in the randomized array.
function printResults(array) {

    // Clear generated child elements from the results section (start fresh if app runs multiple times)
    clearChildren(resultSection)

    // Display the results section
    resultSection.classList.remove('inactive')

    // Create and append the list items for each index, adding class property for styling. 
    array.forEach(function(item) {
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
    // allPlayers = []
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

    refocus()
}

function refocus() {
    // Bring focus to user's previous selection in the game selection toggle form (using gameSelected variable).
        document.getElementById(gameSelected).focus()
}

// Run reset function if escape key is pressed.
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        formReset()
    }
})