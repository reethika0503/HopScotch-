const buttonContainer = document.getElementById('buttonContainer');
const destinationContainer = document.getElementById('destinationContainer');
const lvlNo = document.getElementsByClassName('headingText')
const checkButton = document.getElementById('checkButton');
const resetButton = document.getElementById('resetButton');
const character = document.getElementById('character');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Store the button sequences for each level
const levelSequences = {
  1: ['Hop', 'Skip', 'Jump'],
  2: ['Hop', 'Hop', 'Skip', 'Jump'],
  3: ['Jump', 'Skip', 'Hop', 'Hop'],
  4: ['Hop', 'Hop', 'Hop', 'Skip', 'Hop', 'Hop', 'Jump'],
  5: ['Hop', 'Hop', 'Hop','Skip-HopRight','Hop', 'Jump'], // Example level with right skip
  6: ['Hop', 'SkipLeft', 'Hop'], // Example level with left skip
  // Add more levels as needed
};

let availableButtons;
let currentLevel = 4; // Set the initial level or dynamically determine the level

// Initialize the game
function initializeGame(level) {
  currentLevel = level;
  availableButtons = levelSequences[level];

  // Update button visibility
  updateButtonVisibility();

  // Add event listener for the reset button
  resetButton.addEventListener('click', resetGame);
}

// Update the visibility of buttons based on the current level
function updateButtonVisibility() {
  const buttons = Array.from(buttonContainer.children);

  // Make all buttons visible
  buttons.forEach(button => {
    button.style.display = 'block';
  });

  // Hide buttons that are not required for the current level
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

  // Check if the button is available for the current level
  const isButtonAvailable = availableButtons.includes(buttonId);

  // Only move the button if it is available for the current level
  if (isButtonAvailable) {
    destinationContainer.appendChild(draggedButton);
  }
});

// Check the order when the check button is clicked
checkButton.addEventListener('click', function() {
  const currentOrder = Array.from(destinationContainer.children).map(button => button.id);

  if (isOrderCorrect(currentOrder, availableButtons)) {
    alert(`Congratulations! You arranged the buttons correctly for place ${currentLevel}.`);
    // Move the character based on the arranged buttons
    moveCharacter(currentOrder);
  } else {
    alert('Oops! The buttons are not in the correct order or some buttons are missing. Try again.');
  }
});

// Reset the game
function resetGame() {
  while (destinationContainer.firstChild) {
    buttonContainer.appendChild(destinationContainer.firstChild);
  }
  // Set available buttons back to the current level buttons
  availableButtons = levelSequences[currentLevel];
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
let xPosition = 0;

function moveCharacter(buttonSequence) {
  let index = 0;

  function moveNext() {
    if (index >= buttonSequence.length) {
      showOverlay();
      return;
    }

    const buttonId = buttonSequence[index];
    let moveDistance;

    switch (buttonId) {
      case 'Hop':
        moveDistance = { y: 80, x: 0 };
        break;
      case 'Skip':
        moveDistance = { y: 150, x: 0 }; // Skip moves by two tiles
        break;
      case 'Jump':
        moveDistance = { y: 80, x: 0 }; // Jump moves by three tiles
        break;
      case 'Skip-HopRight':
        moveDistance = { y: 80, x: 32 }; // Skip right by moving down and right
        break;
      case 'SkipLeft':
        moveDistance = { y: 80, x: -80 }; // Skip left by moving down and left
        break;
      default:
        moveDistance = { y: 0, x: 0 };
        break;
    }

    yPosition += moveDistance.y;
    xPosition += moveDistance.x;
    character.style.transform = `translateY(${-yPosition}px) translateX(${xPosition}px)`;

    index++;
    setTimeout(moveNext, 1000); // Delay before the next move
  }

  moveNext();
}

function redirectToNextPage() {
  // Redirect to the next page
  window.location.href = "https://rudhraa-r.github.io/HopScotch-/Hop_lvl/Hop%203/idx_hop3.html";
}

function Startover() {
  // Redirect to the next page
  window.location.href = "https://rudhraa-r.github.io/HopScotch-/Hop_lvl/Hop%202/idx_hop2.html";
}

function Mainlvl() {
  // Redirect to the next page
  window.location.href = "https://rudhraa-r.github.io/HopScotch-/Hop_lvl/index_hop.html";
}

function showOverlay() {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);

  const overlayContent = document.createElement('div');
  overlayContent.classList.add('overlay-content');
  overlay.appendChild(overlayContent);

  const overlayMessage = document.createElement('p');
  overlayMessage.textContent = 'Congratulations! You completed this level.';
  overlayContent.appendChild(overlayMessage);

  const redirectButton = document.createElement('button');
  redirectButton.textContent = 'Next Level';
  redirectButton.addEventListener('click', redirectToNextPage);
  overlayContent.appendChild(redirectButton);

  const startover = document.createElement('button');
  startover.textContent = 'Start Over';
  startover.addEventListener('click', Startover);
  overlayContent.appendChild(startover);

  const mainlvl = document.createElement('button');
  mainlvl.textContent = 'Main Levels';
  mainlvl.addEventListener('click', Mainlvl);
  overlayContent.appendChild(mainlvl);
}

// Function to remove overlay
function removeOverlay() {
  const overlay = document.querySelector('.overlay');
  if (overlay) {
    overlay.remove();
  }
}

// Initialize the game for the current level
initializeGame(currentLevel);
