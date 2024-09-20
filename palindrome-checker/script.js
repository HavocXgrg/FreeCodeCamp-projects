const inputField = document.getElementById("text-input");
const result = document.getElementById("result");
const btn = document.getElementById("check-btn");

const palindromeChecker = () => {
  const inputText = inputField.value.trim();

  if (!inputText) {
    // Check if input is empty
    alert("Please input a value");
    return;
  }
  // Remove non-alphanumeric characters and convert to lowercase for comparison
  const cleanedText = inputText.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversedText = cleanedText.split("").reverse().join("");

  if (cleanedText === reversedText) {
    result.innerText = inputText + " is a palindrome";
  } else {
    result.innerText = inputText + " is not a palindrome";
  }
  result.classList.remove("hidden");
};

btn.addEventListener("click", palindromeChecker);
