// Elements from input form for gathering number of players
const numForm = document.getElementById('numForm')
// const inputContainer1 = document.getElementById('inputContainer1')
const numInput = document.getElementById('numInput')
const numButton = document.getElementById('numSubmit')

// Elements from input form for gathering player names
const nameForm = document.getElementById('nameForm')
const inputContainer2 = document.getElementById('inputContainer2')
const nameButton = document.getElementById('nameSubmit')

// Elements for displaying final results
const resultSection = document.getElementById('resultSection')

// const resetButton = document.getElementById('resetButton')

// Variable to store input value for the number of players text field.
let numPlayers = parseInt(numInput.value)

// Listen for change on number of players input
numInput.addEventListener('change', assignNum)
// Set value of numPlayers = the form value
function assignNum(event) {
    numPlayers = parseInt(event.target.value)
}

// Declare arrays to store user data
let numArray = []
let nameArray = []

// Listen for submit event on number form. 
numForm.addEventListener('submit', submitNumForm)

// When submit clicked, send numPlayers value, clean up form elements, and call next function. 
function submitNumForm(event) {
    event.preventDefault()
    // Populate empty array with a number of items = the numPlayers value
    numArray = []
    for (let i = 1; i <= numPlayers; i++) {
        numArray.push(`Player${i}`)
    }
    // Hide first form
    numForm.classList.add('inactive')
    numButton.classList.add('inactive')
    nameButton.classList.remove('inactive')
    // Call fn to display the names form
    generateNamesForm()
}

// After the initial form submit, we generate a form with # inputs === # selected in the first form:
function generateNamesForm() {
    // Update prompt heading for next step.
    document.querySelector('h2').innerText = `Let's gather all the names`;
    // Iterate through number array and create input/label inside a div for each array index and give them values/attributes from element parameter. 
    numArray.forEach(function(element) {
        string = element.toString()
        // Create & append div for styling the form containers
        const inputDiv = document.createElement('div')
        inputContainer2.appendChild(inputDiv)
        inputDiv.setAttribute('class', 'inputDiv')
        inputDiv.setAttribute('class', 'altColor')
        // Create label elements and name using numArray to link each to corresponding input element
        const label = document.createElement('label')
        label.innerText = string
        label.setAttribute('for', string)
        inputDiv.appendChild(label)
        // Create & append input elements and add their properties
        const input = document.createElement('input')
        input.setAttribute('class', 'nameInput')
        input.setAttribute('id', string)
        inputDiv.appendChild(input)
        // Send Focus to first input
        document.getElementById('Player1').focus()
    })
}

nouveauArray = []
// Listen for second form submit click.
nameForm.addEventListener('submit', submitNameForm)
// When name form submits, call function & store values. 
function submitNameForm(event) {
    event.preventDefault()
    // Update prompt heading for next step.
    document.querySelector('h2').innerText = `Here's the order!`;
    // Array to store temporary name data
    nameArray = []
    // Variable to store the input elements in the names form 
    eachName = document.getElementsByClassName('nameInput')
    // Populate array with elements
    nameArray.push(eachName)
    // console.log(nameArray)
    // console.log(nameArray[0][0].value)
    // console.log(nameArray[0].length)
    // Loop through the nameArray to populate a new array with the user data from the inputs. 
    for (i = 0; i < nameArray[0].length; i++) {
        nouveauArray.push(nameArray[0][i].value)
    }
    // Hide names input form.
    nameForm.classList.add('inactive')
    nameButton.classList.add('inactive')

    // Call the randomizer function. 
    randomatron2000()
}

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

// Send final results to the OL on the page, creating an li for each index in the randomized array.
function printResults() {
    // Display the results section
    resultSection.classList.remove('inactive')
    // Create and append the list items for each index. 
    randomOrder.forEach(function(item) {
        const listItem = document.createElement('li')
        listItem.classList.add('altColor')
        listItem.innerText = item
        resultSection.append(listItem)
    })
}

// Event Listener for reset button
// resetButton.addEventListener('click', formReset)

// function formReset() {
//     console.log('run')
//     // if (!numForm) {
//         console.log('yes')
//         numForm.classList.remove('inactive')
//         numButton.classList.remove('inactive')
//     // }
//     .classList.add('inactive')
//     nameButton.classList.add('inactive')
//     resultSection.classList.add('inactive')
// }