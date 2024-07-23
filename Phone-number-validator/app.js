let checkBtn = document.getElementById('check-btn');
let clearBtn = document.getElementById('clear-btn');
let results = document.getElementById('results-div'); 

const phoneNumbers = [
    "1 555-555-5555",
    "1 (555) 555-5555",
    "1(555)555-5555",
    "1 555 555 5555",
    "5555555555",
    "555-555-5555",
    "(555)555-5555",
    "1 456 789 4444"
];

const checkUserInput = (userInput) => {
    let isValid = phoneNumbers.some(item => userInput === item);
    return isValid ? `Valid US number: ${userInput}` : `Invalid US number: ${userInput}`;
}

checkBtn.addEventListener('click', () => {
    let userInput = document.getElementById('user-input').value; // Get the user input value each time the button is clicked
    if (userInput === '') {
        alert('Please provide a phone number');
    } else {
        let result = checkUserInput(userInput);
        results.textContent = result; // Display the result
    }
});

clearBtn.addEventListener('click', () => {
    document.getElementById('user-input').value = ''; // Clear the input field
    results.textContent = ''; // Clear the results display
});
