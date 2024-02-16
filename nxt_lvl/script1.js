const  draggableElements = document.querySelectorAll('.draggable');
const droppableElements =document.querySelectorAll('.droppable');
const notification = document.querySelector('.notification');
const overlay = document.querySelector('.overlay');
const correctCountElement = document.querySelector('.correct-count .count');
const wrongCountElement = document.querySelector('.wrong-count .count');
const energyFillElement = document.querySelector('.energy-fill');

const maxCount = 8;
let correctCount = 0;
let wrongCount = 0;

draggableElements.forEach(elem => {
    elem.addEventListener("dragstart",dragStart);
});

droppableElements.forEach(elem => {
    elem.addEventListener("dragover",dragOver);
    elem.addEventListener("drop", drop);
    elem.addEventListener("dragenter", dragEnter);
    elem.addEventListener("dragleave", dragLeave);
});

function dragStart(event){
    event.dataTransfer.setData("text", event.target.id);
}
function dragEnter(event){
    event.target.classList.add("droppable-hover");
}
function dragLeave(event){
    event.target.classList.remove("droppable-hover")
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const draggableElementData = event.dataTransfer.getData("text");
    const droppableElementData = event.target.getAttribute("data-draggable-id");
    
    if(draggableElementData === droppableElementData) {
        event.target.classList.add("dropped");
        const draggableElement = document.getElementById(draggableElementData);
        event.target.style.backgroundColor = draggableElement.style.backgroundColor;
        draggableElement.classList.add("dragged");
        draggableElement.setAttribute("draggable", "false");
        const newDiv = document.createElement("div");
    newDiv.classList.add("square.draggableElementData");
    event.target.insertBefore(newDiv, event.target.firstChild);
        incrementCorrectCount();
    const correctTiles = document.querySelectorAll('.dropped');
    if (correctTiles.length === 8) {
      showCongratulations();
    }
  } else {
    showNotification();
  }
}
    
function showNotification() {
    let wrong = document.createElement("span");
    wrong.classList.add("wrong-notif");
    notification.innerHTML = "";
    wrong.innerHTML = `Oops, that is not right. Match the number with the correct word`;
    notification.append(wrong);
    notification.classList.add("show");
    overlay.style.display = "block";
    incrementWrongCount();
    setTimeout(closeDiv, 2000);
}
  
function closeDiv() {
    notification.classList.remove("show");
    overlay.style.display = "none";
}
  
function incrementCorrectCount() {
    correctCount++;
    correctCountElement.textContent = correctCount;
    updateEnergyBar();
    if (correctCount === 8) {
      // All correct moves made, perform necessary actions
      // For example, show a winning message
      console.log("Congratulations! You've completed all correct moves.");
    }
  }
  
  function incrementWrongCount() {
    wrongCount++;
    wrongCountElement.textContent = wrongCount;
    updateEnergyBar();
  }
  
  function updateEnergyBar() {
    const energyBar = document.querySelector(".energy-fill");
    const fillPercentage = (correctCount / maxCount) * 100;
    energyBar.style.width = `${fillPercentage}%`;
  }

function showCongratulations() {
    const congratulationsDiv = document.createElement("div");
    congratulationsDiv.classList.add("congratulations");
  
    const message = document.createElement("div");
    message.textContent = "Congratulations! You have arranged all tiles correctly.";
    congratulationsDiv.appendChild(message);
  
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
  
    /*const replayButton = document.createElement("button");
    replayButton.textContent = "Replay";
    replayButton.classList.add("play-button");
    replayButton.addEventListener("click", replay);
    buttonContainer.appendChild(replayButton);*/
  
    const nextLevelButton = document.createElement("button");
    nextLevelButton.textContent = "Next Level";
    nextLevelButton.classList.add("play-button");
    nextLevelButton.addEventListener("click", nextLevel);
    buttonContainer.appendChild(nextLevelButton);
  
    /*const exitButton = document.createElement("button");
    exitButton.textContent = "Exit";
    exitButton.classList.add("play-button");
    exitButton.addEventListener("click", exit);
    buttonContainer.appendChild(exitButton);*/
  
    congratulationsDiv.appendChild(buttonContainer);
  
    document.body.appendChild(congratulationsDiv);
}
  
  /*function replay() {
    // Logic to replay the level goes here
    location.href = "https://rudhraa-r.github.io/Pandi_Aatam-Lvl-1/";;
  }*/
  
function nextLevel() {
    // Logic to proceed to the next level goes here
    window.location.href = "C:\Users\Rudhraa R\Desktop\HopScotch\Main_Page\main.html"
}
