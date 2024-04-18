const draggableElements = document.querySelectorAll('.draggable');
const droppableElements = document.querySelectorAll('.droppable');
const notification = document.querySelector('.notification');
const overlay = document.querySelector('.overlay');
const correctCountElement = document.querySelector('.correct-count .count');
const wrongCountElement = document.querySelector('.wrong-count .count');
const energyFillElement = document.querySelector('.energy-fill');

const maxCount = 8;
let correctCount = 0;
let wrongCount = 0;

// Array with IDs in ascending order
const expectedOrder = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

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

    // Check if dropped element's ID matches the expected ID in the array
    if (draggableElementData === expectedOrder[correctCount]) {
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
        if (correctCount === maxCount) {
            stopTimer(); // Stop the timer if all tiles are arranged correctly
            showCongratulations();
        }
    } 
    else {
        showNotification_1();
    }
}
else {
    showNotification_2();
}
}

function showNotification_2() {
    let wrong = document.createElement("span");
    wrong.classList.add("wrong-notif");
    notification.innerHTML = "";
    wrong.innerHTML = `Oops, that is not in ascending order. Please arrange the tiles in ascending order.`;
    notification.append(wrong);
    notification.classList.add("show");
    overlay.style.display = "block";
    incrementWrongCount();
    setTimeout(closeDiv, 2000);
}
function showNotification_1() {
    let wrong = document.createElement("span");
    wrong.classList.add("wrong-notif");
    notification.innerHTML = "";
    wrong.innerHTML = `Oops, that is not right. Match the number with the correct word in the ascending order.`;
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

    const nextLevelButton = document.createElement("button");
    nextLevelButton.textContent = "Next Level";
    nextLevelButton.classList.add("play-button");
    nextLevelButton.addEventListener("click", nextLevel);
    buttonContainer.appendChild(nextLevelButton);

    congratulationsDiv.appendChild(buttonContainer);

    document.body.appendChild(congratulationsDiv);
}

function nextLevel() {
    window.location.href = "https://rudhraa-r.github.io/HopScotch-/Lvl_4/index4.html";
}

function retryLevel (){
    window.location.href = "https://rudhraa-r.github.io/HopScotch-/Lvl_3/index3.html";
}

function mainLevel() {
    // Logic to proceed to the next level goes here
   return window.location.href = "https://rudhraa-r.github.io/HopScotch-/main.html"
  }

const instt = document.querySelector('.inst');
const retry_lvl = document.querySelector('.retry_lvl');
const startButton = document.getElementById('startButton');
const timerElement = document.querySelector('.timer');
let timerCount = 20;
let timerInterval;
overlay.classList.add('show')

startButton.addEventListener('click', startGame);
function beforestart(){
    overlay.style.display='block'
    instt.classList.add('show');
    startButton.style.display='block';
 }
beforestart();

function startGame() {
    // Hide the start button once the game starts
    overlay.style.display='none';
    startButton.style.display = 'none';
    startTimer();

}
function startTimer() {
    timerInterval = setInterval(() => {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount === 0) {
            clearInterval(timerInterval);
            showRetryNotification();
        }
    }, 1000);
}
function stopTimer() {
    clearInterval(timerInterval);
}
function showRetryNotification() {
    const retryDiv = document.createElement("div");
    retryDiv.classList.add("Retry");

    overlay.style.display = "block";
    const message = document.createElement("div");
    message.textContent = "Time's up! Please retry to arrange the tiles within 20 seconds.";
    retryDiv.appendChild(message);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const retryLevelButton = document.createElement("button");
    retryLevelButton.textContent = "Retry Level";
    retryLevelButton.classList.add("rb-notif");
    retryLevelButton.addEventListener("click", retryLevel);
    buttonContainer.appendChild(retryLevelButton)

    const mainLevelButton = document.createElement("button");
    mainLevelButton.textContent = "Main Page";
    mainLevelButton.classList.add("play-button");
    mainLevelButton.addEventListener("click", mainLevel);
    buttonContainer.appendChild(mainLevelButton);

    retryDiv.appendChild(buttonContainer);
    retry_lvl.classList.add("show");
    retry_lvl.appendChild(retryDiv);
    /*let retry = document.createElement("span");
    retry.classList.add("retry-notif");
    notification.innerHTML = "";
    retry.innerHTML = `Time's up! Please retry to arrange the tiles within 16 seconds.`;
    notification.append(retry);
    notification.classList.add("show");
    overlay.style.display = "block";


    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const retryLevelButton = document.createElement("button");
    retryLevelButton.textContent = "Retry Level";
    retryLevelButton.classList.add("rb-notif");
    retryLevelButton.addEventListener("click", nextLevel);
    buttonContainer.appendChild(retryLevelButton);
    retry.append(button-container);*/
}
