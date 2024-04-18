const buttonContainer = document.getElementById('buttonContainer');
const destinationContainer = document.getElementById('destinationContainer');
const checkButton = document.getElementById('checkButton');
const resetButton = document.getElementById('resetButton');
const character = document.getElementById('character');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


// Store the buttons for place 1
const place1Buttons = ['Hop'];
const tiles = [1, 2, 3, 4, 5]
let availableButtons;

// Initialize the game
function initializeGame() {
  // Set available buttons to place 5 buttons
  availableButtons = place1Buttons;
  
  // Update button visibility
  updateButtonVisibility();

  // Add event listener for the reset button
  resetButton.addEventListener('click', resetGame);
}

// Update the visibility of buttons based on the current place
function updateButtonVisibility() {
    const buttons = Array.from(buttonContainer.children);
  
    // Make all buttons visible
    buttons.forEach(button => {
      button.style.display = 'block';
    });
  
    // Hide buttons that are not required for place 5
    buttons.forEach(button => {
      const buttonId = button.id;
      const isButtonAvailable = availableButtons.includes(buttonId);
      if (!isButtonAvailable) {
        button.style.display = 'none';
      }
    });
}

// Add event listeners for drag and drop functionality
buttonContainer.addEventListener('dragstart', function(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
});

destinationContainer.addEventListener('dragover', function(event) {
  event.preventDefault();
});

destinationContainer.addEventListener('drop', function(event) {
  event.preventDefault();
  const buttonId = event.dataTransfer.getData('text/plain');
  const draggedButton = document.getElementById(buttonId);
  
  // Check if the button is available for place 5
  const isButtonAvailable = availableButtons.includes(buttonId);
  
  // Only move the button if it is available for place 5
  if (isButtonAvailable) {
    destinationContainer.appendChild(draggedButton);
  }
});

// Check the order when the check button is clicked
checkButton.addEventListener('click', function() {
  const currentOrder = Array.from(destinationContainer.children).map(button => button.id);
  
  if (isOrderCorrect(currentOrder, availableButtons)) {
    alert(`Congratulations! You arranged the buttons correctly for place 1.`);
    // Additional logic for character movement or other actions can be added here
    moveCharacter(1);
      
  } else {
    alert('Oops! The buttons are not in the correct order or some buttons are missing. Try again.');
  }
});

// Reset the game
function resetGame() {
    while (destinationContainer.firstChild) {
      buttonContainer.appendChild(destinationContainer.firstChild);
    }
    // Set available buttons back to place 5 buttons
    availableButtons = place5Buttons;
    updateButtonVisibility();
}

// Check if the order is correct and all required buttons are present
function isOrderCorrect(currentOrder, requiredButtons) {
  if (currentOrder.length !== requiredButtons.length) return false;

  for (let i = 0; i < requiredButtons.length; i++) {
    if (currentOrder[i] !== requiredButtons[i]) {
      return false;
    }
  }

  return true;
}
let yPosition = 0;

function moveCharacter(numTiles) {
  if (numTiles <= 0) return; // Base case: Stop recursion when numTiles is 0 or negative

  // Move the character forward by 1 tile
  yPosition += 75;
  character.style.transform = `translateY(${-yPosition}px)`;

  // Move diagonally to the right in the last move
  // Call the function recursively with one less move after a 1-second delay
  setTimeout(() => moveCharacter(numTiles - 1), 1000);
}
  // You can add animations or other effects here



// Load the sprite image

// Initialize the game
initializeGame();
function redirectToNextPage() {
  // Redirect to the next page
  window.location.href = "https://rudhraa-r.github.io/HopScotch-/Hop_lvl/Hop%202/idx_hop2.html";
}
