const mainForm = document.getElementById('mainForm')

const inputContainer = document.getElementsByClassName('inputContainer')

const input1 = document.getElementById('input1')
const input2 = document.getElementById('input2')

const mainInput = document.getElementById('number')

const mainSubmit = document.getElementsByClassName('mainSubmit')

const mainButton = document.querySelector('button')


// Store existing input value for the number of players text field.
let numPlayers = parseInt(mainInput.value)

let numArray = []

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

// Populate empty array with a number of items = the numPlayers value
    numArray = []
    for (let i = 1; i <= numPlayers; i++) {
        numArray.push(`Player ${i}`)
    }
    console.log(numArray)

// Call fn to move on to the next form
    generateNamesForm()
}

function generateNamesForm() {
    // Update prompt heading
    document.querySelector('h2').innerText = `What are their names?`;

    
    numArray.forEach(function(element) {
        string = element.toString()
        console.log(string)
        const label = document.createElement('label')
        label.innerHTML = `for=2`
        label.innerText = string
        const inp = document.createElement('input')
        const para = document.createElement('p')
        para.innerText = element
        inp.innerHTML = `<input id={numArray[i] + 1} type="text" required placeholder=${string}>`
        input2.appendChild(label)
        input2.appendChild(inp)

    })

    // console.log(document.getElementById('names'))
    // const clone = document.getElementById('names');
    // document.getElementById('input2').appendChild(clone)

    // // Update form
    // const container = document.getElementsByClassName('inputContainer')
    // const para = document.createElement('p');
    // para.textContent = 'helloooooooo';
    // console.log(inputContainer, para.textContent)

    // container.append(para)
    
}