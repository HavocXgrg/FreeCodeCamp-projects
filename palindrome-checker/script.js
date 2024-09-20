let result = document.getElementById('result')

document.getElementById('check-btn').addEventListener('click', function() {
    var inputText = document.getElementById('text-input').value;
    if (inputText.trim() === "") {
      alert("Please input a value");
    } else {
      // Remove non-alphanumeric characters and convert to lowercase for comparison
      var cleanedText = inputText.toLowerCase().replace(/[^a-z0-9]/g, '');
      var reversedText = cleanedText.split('').reverse().join('');
      if (cleanedText === reversedText) {
        result.innerText = inputText + " is a palindrome";
      } else {
        result.innerText = inputText + " is not a palindrome";
      }
      result.classList.remove('hidden')
    }
    
  });