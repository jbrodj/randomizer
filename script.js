const mainForm = document.getElementById('mainForm')

const inputContainer = document.getElementsByClassName('inputContainer')

const input1 = document.getElementById('input1')
const input2 = document.getElementById('input2')

const mainInput = document.getElementById('number')

const mainSubmit = document.getElementsByClassName('mainSubmit')

const mainButton = document.getElementById('mainSubmit')

const nameButton = document.getElementById('nameSubmit')

const resultSection = document.getElementById('resultSection')

const resetButton = document.getElementById('resetButton')

const div1 = document.getElementById('container1')
const div2 = document.getElementById('container2')
const div3 = document.getElementById('container3')

// Store existing input value for the number of players text field.
let numPlayers = parseInt(mainInput.value)

let numArray = []
let nameArray = []

// Listen for change on number of players input
mainInput.addEventListener('change', assignNum)
// Set value of numPlayers = the form value
function assignNum(event) {
    numPlayers = parseInt(event.target.value)
}

// Listen for submit button on main form. 
mainButton.addEventListener('click', submitMainForm)
// When submit clicked, send numPlayers value and call next function. 
function submitMainForm(event) {
    event.preventDefault
    console.log(numPlayers)
// Hide first form
    div1.classList.add('inactive')
    mainForm.classList.add('inactive')
    mainButton.classList.add('inactive')
    div2.classList.remove('inactive')
    nameButton.classList.remove('inactive')
// Populate empty array with a number of items = the numPlayers value
    numArray = []
    for (let i = 1; i <= numPlayers; i++) {
        numArray.push(`Player${i}`)
    }
// Call fn to move on to the next form
    generateNamesForm()
}

// After the initial form submit, we run:
function generateNamesForm() {
    // Update prompt heading for next step.
    document.querySelector('h2').innerText = `Let's gather all the names`;
    // Iterate through number array and create input/label inside a div for each array index and give them values/attributes. 
    numArray.forEach(function(element) {
        string = element.toString()
        const inputDiv = document.createElement('div')
        input2.appendChild(inputDiv)
        inputDiv.setAttribute('class', 'inputDiv')
        inputDiv.setAttribute('class', 'altColor')
        const label = document.createElement('label')
        label.innerText = string
        label.setAttribute('for', string)
        const inp = document.createElement('input')
        inputDiv.appendChild(label)
        inputDiv.appendChild(inp)
        inp.setAttribute('class', 'nameInput')
        inp.setAttribute('id', string)
    })
}


nouveauArray = []
// Listen for second form submit click.
nameButton.addEventListener('click', submitNameForm)
// When name form submits, call function & store values. 
function submitNameForm(event) {
        // Update prompt heading for next step.
    document.querySelector('h2').innerText = `Here's the order!`;
    nameArray = []
    eachName = document.getElementsByClassName('nameInput')

    nameArray.push(eachName)

    console.log(nameArray)
    console.log(nameArray[0][0].value)

    console.log(nameArray[0].length)

    for (i = 0; i < nameArray[0].length; i++) {
        console.log(i)
        nouveauArray.push(nameArray[0][i].value)
    }
    console.log(nouveauArray)

    // Hide second form.
    nameForm.classList.add('inactive')
    nameButton.classList.add('inactive')

    // Call the randomizer function. 
    randomatron2000()
}

// Define final array to store randomized name order.
const numberizer = []

function randomatron2000() {
    // Generate random number, add item at that index to numberizer array, and remove it from array of names.
    while (nouveauArray.length > 0) {
        rando = Math.floor(Math.random() * nouveauArray.length)
        numberizer.push(nouveauArray[rando])
        nouveauArray.splice(rando, 1)
    }

    // Call the print function
    printResults()
}

// Send final results to the UL on the page, creating an li for each array index.
function printResults() {
    resultSection.classList.remove('inactive')

    numberizer.forEach(function(item) {
        const listItem = document.createElement('li')
        listItem.classList.add('altColor')
        listItem.innerText = item
        resultSection.append(listItem)

    })
}

// Event Listener for reset button
resetButton.addEventListener('click', formReset)

function formReset() {
    console.log('run')
    // if (!mainForm) {
        console.log('yes')
        mainForm.classList.remove('inactive')
        mainSubmit.classList.remove('inactive')
    // }
    nameForm.classList.add('inactive')
    nameButton.classList.add('inactive')
    resultSection.classList.add('inactive')
}

